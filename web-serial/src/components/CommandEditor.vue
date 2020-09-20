<template>
  <v-dialog v-model="dialog" persistent max-width="400px" @click:outside="clickOutside">
    <v-card ref="content">
      <v-card-title>
        <span class="headline">Command Editor</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row align="center">
            <span class="text-caption">
              Write as you normally would write a Javascript string.
              For example, to write a 0x01 byte, write '\x01'.
            </span>
            <span class="text-caption">
              Also, by enabling capture groups in your RegEx match, you can also use
              $n inside your command ($1 to $n returns each capture group). In this case,
              if you want a literal '$n', write '$' as '\x24'.
            </span>
            <v-col cols="8">
              <v-text-field v-model="command.name" label="Name" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="command.content" label="Command" required></v-text-field>
            </v-col>
            <v-card class="grey darken-3 pa-2">
              <span class="text-caption">
                Send automatically when this RegEx matches a new message: <br />
                (leave empty for a manual command)
              </span>
              <v-col cols="12" class="pb-0">
                <v-text-field v-model="sequenceField" label="RegEx" required></v-text-field>
              </v-col>
              <v-row class="pa-0">
                <v-col cols="6" class="pa-0"></v-col>
                <v-col cols="6" class="pa-0">
                  <v-checkbox class="mt-0" v-model="command.captureGroups" label="Capture Groups" />
                </v-col>
              </v-row>
            </v-card>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text v-on:click="closeDialog(false)">Close</v-btn>
        <v-btn color="blue darken-1" text v-on:click="closeDialog(true)">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { maybeSlashEnclosed } from "../utils/textRegex";
import { unionReplacerFlags } from "../utils/textRegex";
import { removeFlags } from "../utils/textRegex";
import SnackbarMessage from "../utils/enums/SnackbarMessage";
import unescapeJs from "unescape-js";

export default {
  name: "CommandEditor",

  data: () => ({
    dialog: false,
    command: {
      id: -1,
      name: "",
      content: "",
      sequence: null,
      captureGroups: false,
      processedContent: "",
    },
    sequenceField: "",
  }),

  methods: {
    openDialog(command) {
      this.dialog = true;
      this.command = command;
      this.previousCommand = JSON.parse(JSON.stringify(command));
      this.previousCommand.sequence = this.command.sequence;

      if (this.command.sequence) {
        this.sequenceField = removeFlags(this.command.sequence.toString());

        // prevent the previous sequence from being matched while the editor is opened
        this.command.sequence = null;
      }
      else {
        this.sequenceField = "";
      }
    },

    closeDialog(save=false) {
      if (!save) {
        Object.assign(this.command, this.previousCommand);
        this.dialog = false;
        return;
      }

      this.trySettingRegex();
      this.processContent();
      this.dialog = false;
    },

    processContent(command=this.command) {
      if (command.captureGroups) {
        const result = [];
        let lastIndex = 0;

        for (let i = 0; i < command.content.length; i++) {
          if (command.content[i] === '$') {
            let macroEnd = i + 1;
            while (command.content.charCodeAt(macroEnd) >= 48 && command.content.charCodeAt(macroEnd) <= 57) {
              macroEnd++;
            }

            if (macroEnd > i + 1) {
              const captureGroup = parseInt(command.content.slice(i + 1, macroEnd));

              if (captureGroup) {
                result.push(unescapeJs(command.content.slice(lastIndex, i)));
                result.push(captureGroup);
                lastIndex = macroEnd;
              }
            }
          }
        }

        result.push(unescapeJs(command.content.slice(lastIndex)));
        command.processedContent = result;
      }
      else {
        command.processedContent = unescapeJs(command.content);
      }
    },

    trySettingRegex(command=this.command, sequenceField=this.sequenceField) {
      if (!sequenceField) {
        return;
      }

      try {
        if (maybeSlashEnclosed(sequenceField)) {
          this.$emit("snackbar", SnackbarMessage.Warning.NoRegexSlashes);
        }

        command.sequence = new RegExp(sequenceField, unionReplacerFlags);
        this.$emit("command-changed", command);
      }
      catch {
        this.$emit("snackbar", SnackbarMessage.Error.InvalidRegExp);
        command.sequence = null;
      }
    },

    shouldWarnNotSaved() {
      const previousSequenceField = (this.previousCommand.sequence)
        ? removeFlags(this.previousCommand.sequence.toString())
        : "";

      // A bit of spaghetti here: since this.command has a null sequence, we
      // can't compare the sequences inside JSON.stringify().
      // Since the sequences are checked as strings in another comparison,
      // this.previousCommand.sequence can be set to null so it will match
      // this.command inside JSON.stringify().

      const seq = this.previousCommand.sequence;
      this.previousCommand.sequence = null;

      const resp = JSON.stringify(this.command) !== JSON.stringify(this.previousCommand)
        || this.sequenceField !== previousSequenceField;

      // so this doesnt lead to any issues if we need to revert this.command
      // to this.previousCommand
      this.previousCommand.sequence = seq;
      
      return resp;
    },

    clickOutside(event) {
      if (this.shouldWarnNotSaved()) {
        const command = this.command;
        const sequenceField = this.sequenceField;
        const commandCopy = JSON.stringify(this.command);

        this.$emit("snackbar", SnackbarMessage.Warning.DidntSaveCommand(() => {
          Object.assign(command, JSON.parse(commandCopy));
          this.trySettingRegex(command, sequenceField);
          this.processContent(command);
        }));
      }

      if (!this.$refs.content.$el.contains(event.target)) {
        this.closeDialog(false);
      }
    },
  },
};
</script>
