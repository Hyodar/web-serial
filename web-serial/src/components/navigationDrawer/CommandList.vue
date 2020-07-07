<template>
  <NavigationDrawerRow>
    <template v-slot:header>
      <InfoDialog label="Commands">
        <p>
          Here, you can add <b> commands </b> to quickly send whenever
          necessary, without needing to type it over and over again.
        </p>
        <p>
          You can write them as a simple Javascript escaped string, for
          example: <code>Never Gonn\x61 Give Yo\165 Up!\n</code> <br />
          <span class="text-caption"> Is this considered a rickroll? </span>
        </p>
        <p>
          <b> Just a note!!! </b> We're not simply evaluating the string,
          we use a really nice library to safely process the text, so don't
          worry!
        </p>
      </InfoDialog>
      <v-spacer></v-spacer>
      <div class="text-button"> Commands </div>
      <v-spacer></v-spacer>
      <v-btn icon v-on:click="addNewCommand" small>
        <v-icon> mdi-plus </v-icon>
      </v-btn>
    </template>

    <CommandEditor
      ref="commandEditor"
      v-on:snackbar="sendSnackbar($event)"
      v-on:command-changed="commandChanged"
    />

    <v-card class="grey darken-3" style="height: 300px; width: 100%;" v-bar>
      <v-list>
        <v-list-item-group>
          <v-list-item
            v-for="(item, idx) in value"
            :key="idx"
          >
            <v-list-item-action>
              <v-btn icon color="white" v-on:click="sendCommand(item.content)">
                <v-icon normal class="mdi-flip-horizontal">
                  mdi-reply
                </v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-content v-on:click="openCommandEditor(item);">
              <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </NavigationDrawerRow>
</template>

<script>
import InfoDialog from "../InfoDialog";
import CommandEditor from "../CommandEditor";
import NavigationDrawerRow from "./NavigationDrawerRow";
import SnackbarMessage from '../../utils/enums/SnackbarMessage';

export default {
  name: "CommandList",

  components: {
    InfoDialog,
    CommandEditor,
    NavigationDrawerRow,
  },

  props: ["value", "scanBufferSize"],

  data: () => ({
    commandCount: 0,
    scanBuffer: "",
  }),

  methods: {
    sendSnackbar(event) {
      this.$emit("snackbar", event);
    },

    addNewCommand() {
      this.value.push({
        name: `Command ${this.commandCount++}`,
        content: "",
        sequence: null,
        scanCursor: this.scanBuffer.length,
      });
    },

    openCommandEditor(command) {
      this.$refs.commandEditor.openDialog(command);
    },

    commandChanged(command) {
      command.scanCursor = this.scanBuffer.length;
    },

    sendCommand(command) {
      if (command) {
        this.$emit("sendCommand", command);
      }
    },

    addToScanBuffer(chunk) {
      this.scanBuffer += chunk;

      const overflow = this.scanBuffer.length - this.scanBufferSize;
      if (overflow > 0) {
        this.scanBuffer = this.scanBuffer.slice(overflow);

        this.value.forEach(command => {
          command.scanCursor = Math.max(command.scanCursor - overflow, 0);
        });
      }

      this.checkMatches();
    },

    checkMatches() {
      if (!this.scanBuffer) {
        return;
      }

      this.value.filter(command => command.sequence)
        .forEach(command => {
          const initialScanCursor = command.scanCursor;
          const substr = this.scanBuffer.slice(initialScanCursor);
          const matches = substr.matchAll(command.sequence);

          for (const match of matches) {
            if (!match[0]) continue;

            command.scanCursor = Math.max(
              command.scanCursor,
              initialScanCursor + match.index + match[0].length
            );

            this.sendCommand(command.content);
            this.sendSnackbar(SnackbarMessage.Success.CommandTriggered(command.name));
          }
        });
    }
  },
}
</script>
