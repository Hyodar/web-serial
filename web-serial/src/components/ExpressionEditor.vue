<template>
  <v-dialog v-model="dialog" persistent max-width="300px" @click:outside="clickOutside">
    <v-card ref="content">
      <v-card-title>
        <span class="headline">Expression Editor</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row align="center">
            <v-col cols="8">
              <v-text-field v-model="expression.name" label="Name" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="expressionField" label="RegEx" required></v-text-field>
            </v-col>
          </v-row>
        </v-container>

        <label>Color Target</label>
        <HorizontalSelection 
          :options="[
            { name: 'Background', val: 'background-color' },
            { name: 'Text', val: 'color' }
          ]"
          :value="expression.colorTarget"
          v-on:changedValue="expression.colorTarget = $event"
        />
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
import { noMatchRegexString } from "../utils/textRegex";
import SnackbarMessage from "../utils/enums/SnackbarMessage";
import HorizontalSelection from "./HorizontalSelection";

export default {
  name: "ExpressionEditor",
  
  components: {
    HorizontalSelection,
  },

  data: () => ({
    dialog: false,
    expression: {
      name: "",
      expression: "",
      colorTarget: "",
    },
    expressionField: "",
  }),

  methods: {
    openDialog(expression) {
      this.dialog = true;
      this.expression = expression;
      this.previousExpression = Object.assign({}, expression);

      this.expressionField = this.expression.expression.toString().slice(1, -1);
    },

    closeDialog(save=false) {
      if (!save) {
        Object.assign(this.expression, this.previousExpression);
        this.dialog = false;
        return;
      }

      try {
        if (maybeSlashEnclosed(this.expressionField)) {
          this.$emit("snackbar", SnackbarMessage.Warning.NoRegexSlashes);
        }

        this.expression.expression = new RegExp(this.expressionField || "a^", "");
      }
      catch {
        this.$emit("snackbar", SnackbarMessage.Error.InvalidRegExp);
        this.expression.expression = new RegExp(noMatchRegexString, "");
      }

      this.dialog = false;
    },

    expressionsEqual(expression1, expression2) {
      const expression1Regex = (expression1.expression)
        ? expression1.expression.toString()
        : "";
      const expression2Regex = (expression2.expression)
        ? expression2.expression.toString()
        : "";

      return JSON.stringify(expression1) === JSON.stringify(expression2)
        && expression1Regex === expression2Regex;
    },

    shouldWarnNotSaved() {
      return !this.expressionsEqual(this.expression, this.previousExpression)
        || this.expressionField !== this.previousExpression.expression.toString().slice(1, -1);
    },

    clickOutside(event) {
      if (this.shouldWarnNotSaved()) {
        const expressionCopy = Object.assign({}, this.expression);
        const expressionField = this.expressionField;

        this.$emit("snackbar", SnackbarMessage.Warning.DidntSaveExpression(() => {
          if (this.expression.id !== expressionCopy.id) {
            this.$emit("snackbar", SnackbarMessage.Error.ExpressionSave);
            return;
          }

          Object.assign(this.expression, expressionCopy);
          this.expressionField = expressionField;
          this.closeDialog(true);
        }));
      }

      if (!this.$refs.content.$el.contains(event.target)) {
        this.closeDialog(false);
      }
    },
  },
};
</script>