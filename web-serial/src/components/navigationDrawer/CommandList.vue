<template>
  <NavigationDrawerRow>
    <template v-slot:header>
      <InfoDialog label="Commands">
        <p>
          Here, you can add <b>commands</b> to quickly send whenever
          necessary, without needing to type it over and over again.
        </p>
        <p>
          You can write them as a simple Javascript escaped string, for
          example: <code>Never Gonn\x61 Give Yo\165 Up!\n</code> <br />
          <span class="text-caption"> Is this considered a rickroll? </span>
        </p>
        <p>
          <b>Just a note!!!</b> We're not simply evaluating the string,
          we use a really nice library to safely process the text, so don't
          worry!
        </p>
      </InfoDialog>
      <v-spacer></v-spacer>
      <div class="text-button">Commands</div>
      <v-spacer></v-spacer>
    </template>

    <CommandEditor
      ref="commandEditor"
      v-on:snackbar="sendSnackbar($event)"
      v-on:command-changed="commandChanged"
    />

    <v-card class="grey darken-3 custom-scrollbar" style="height: 260px; width: 100%; overflow-y: scroll; resize: vertical;">
      <v-list>
        <v-list-item-group>
          <v-list-item
            v-for="(item, idx) in value"
            :key="idx"
          >
            <v-list-item-action class="ma-0 mr-4">
              <v-btn icon color="white" v-on:click="sendCommand(item.content)">
                <v-icon large class="mdi-flip-horizontal">
                  mdi-reply
                </v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-content v-on:click="openCommandEditor(item);">
              <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="ma-2">
            <v-list-item-action>
            </v-list-item-action>
            <v-list-item-content @click.stop="addNewCommand($event);">
              <v-list-item-title>
                <v-icon>mdi-plus</v-icon>
                Add command
              </v-list-item-title>
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
import SnackbarMessage from "../../utils/enums/SnackbarMessage";
import throttle from "lodash/throttle";
import { noMatchRegexString } from "../../utils/textRegex";
import { unionReplacerFlags } from "../../utils/textRegex";

// Initialize capture groups regexes
const captureGroupsRegexes = new Map();
captureGroupsRegexes.set(0, new RegExp(noMatchRegexString, unionReplacerFlags));
for (let i = 1; i <= 10; i++) {
  const regexText = Array.from(new Array(i).keys()).map(idx => `\\$${idx + 1}`).join("|");
  captureGroupsRegexes.set(i, new RegExp(regexText, unionReplacerFlags));
}

export default {
  name: "CommandList",

  components: {
    InfoDialog,
    CommandEditor,
    NavigationDrawerRow,
  },

  props: ["value", "scanBufferSize"],

  data: () => ({
    scanBuffer: "",
  }),

  methods: {
    sendSnackbar(event) {
      this.$emit("snackbar", event);
    },

    addNewCommand() {
      const id = (this.value.length)
        ? this.value[this.value.length - 1].id + 1
        : 0;
      
      const newCommand = {
        id: id,
        name: `Command ${id}`,
        content: "",
        sequence: null,
        scanCursor: this.scanBuffer.length,
        captureGroups: false,
      };

      this.value.push(newCommand);
      this.openCommandEditor(newCommand);
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
          command.scanCursor = Math.max(0, command.scanCursor - overflow);
        });
      }

      this.checkMatches();
    },

    resetScanBuffer() {
      this.value.forEach(command => {
        command.scanCursor = 0;
      });
      this.scanBuffer = "";
    },

    checkMatches: throttle(function () {
      if (!this.scanBuffer) {
        return;
      }

      const commandContents = [];

      this.value.filter(command => command.sequence)
        .forEach(command => {
          const initialScanCursor = command.scanCursor;
          const substr = this.scanBuffer.slice(initialScanCursor, this.scanBuffer.length);
          const matches = substr.matchAll(command.sequence);

          for (const match of matches) {
            if (!match[0]) continue;

            command.scanCursor = Math.max(
              command.scanCursor,
              initialScanCursor + match.index + match[0].length
            );

            if (command.captureGroups) {
              const replacedContent = command.content.replaceAll(
                captureGroupsRegexes.get(match.length - 1) || new RegExp(match.slice(1).map((_, idx) => `\\$${idx + 1}`).join("|"), unionReplacerFlags),
                matchedGroup => {
                  return match[parseInt(matchedGroup.slice(1))] || "";
                }
              );

              commandContents.push(replacedContent);
            }
            else {
              commandContents.push(command.content);
            }
            this.sendSnackbar(SnackbarMessage.Success.CommandTriggered(command.name));
          }
        });
      
      if (commandContents.length) {
        this.sendCommand(commandContents.join(""));
      }
    }, 250)
  },
};
</script>
