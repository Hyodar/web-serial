<template>
  <v-dialog v-model="dialog" persistent max-width="300px">
    <v-card>
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
              <v-col cols="12">
                <v-text-field v-model="sequenceField" label="RegEx" required></v-text-field>
              </v-col>
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
import SnackbarMessage from "../utils/enums/SnackbarMessage";

export default {
  name: "CommandEditor",

  data: () => ({
    dialog: false,
    command: {
      name: "",
      content: "",
      sequence: null,
    },
    sequenceField: "",
  }),

  methods: {
    openDialog(command) {
      this.dialog = true;
      this.command = command;
      this.previousCommand = Object.assign({}, command);

      if (this.command.sequence) {
        this.sequenceField = this.command.sequence
          .toString()
          .slice(1, -(1 + unionReplacerFlags.length));

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

      if (this.sequenceField) {
        try {
          if (maybeSlashEnclosed(this.sequenceField)) {
            this.$emit("snackbar", SnackbarMessage.Warning.NoRegexSlashes);
          }

          this.command.sequence = new RegExp(this.sequenceField, unionReplacerFlags);
          this.$emit("command-changed", this.command);
        }
        catch {
          this.$emit("snackbar", SnackbarMessage.Error.InvalidRegExp);
          this.command.sequence = null;
        }
      }

      this.dialog = false;
    }
  }
}
</script>
