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

    <CommandEditor ref="commandEditor" v-on:snackbar="sendSnackbar($event)"/>

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

export default {
  name: "CommandList",

  components: {
    InfoDialog,
    CommandEditor,
    NavigationDrawerRow,
  },

  props: ["value"],

  data: () => ({
    commandCount: 0,
    scanTimeout: null,
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
      });
    },

    openCommandEditor(command) {
      this.$refs.commandEditor.openDialog(command);
    },

    sendCommand(command) {
      if (command) {
        this.$emit("sendCommand", command);
      }
    },

    addToScanBuffer(chunk) {
      if (this.scanTimeout) {
        clearTimeout(this.scanTimeout);
        this.scanTimeout = null;
      }

      this.scanBuffer += chunk;
      this.scanTimeout = setTimeout(this.checkMatches.bind(this), 300);
    },

    checkMatches() {
      if (!this.scanBuffer) {
        return;
      }

      this.value.forEach(command => {
        if (command.sequence) {
          const result = this.scanBuffer
            .match(command.sequence)
            .filter(el => el);

          if (result) {
            for (let i = 0; i < result.length; i++) {
              this.sendCommand(command.content);
            }
          }
        }
      });

      this.scanBuffer = "";
    }
  },
}
</script>
