<template>
  <v-dialog v-model="dialog" persistent max-width="300px">
    <v-card>
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
import { isRegex } from "../utils/textRegex";

export default {
  name: "ExpressionEditor",

  data: () => ({
    dialog: false,
    expression: {
      name: "",
      expression: "",
    },
    expressionField: "",
  }),

  methods: {
    openDialog(expression) {
      this.dialog = true;
      this.expression = expression;
      this.previousExpression = Object.assign({}, expression);

      this.expressionField = this.expression.expression.toString();
    },

    closeDialog(save=false) {
      if (!save) {
        Object.assign(this.expression, this.previousExpression);
        this.dialog = false;
        return;
      }

      const flags = isRegex(this.expressionField);

      if (flags) {
        this.expression.expression = new RegExp(this.expressionField.slice(1, - (1 + flags.length)), flags);
      }
      else {
        this.expression.expression = new RegExp(this.expressionField, "g");
      }

      this.dialog = false;
    }
  }
}
</script>