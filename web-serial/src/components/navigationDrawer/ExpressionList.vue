<template>
  <NavigationDrawerRow>
    <template v-slot:header>
      <InfoDialog label="Expressions">
        <p>
          The <b>expression</b>list is used for<b>expressions</b>
          that you'd like to highlight, for example a network packet.
        </p>
        <p>
          You can specify those using traditional RegEx and then choose any
          highlight color - <b>it's as simple as that.</b>
        </p>
        <p>
          However, note that the expressions are matched in the list order
          character per character, so if you want something to be matched
          with higher priority, it has to be on the top of the list.
        </p>
      </InfoDialog>
      <v-spacer></v-spacer>
      <div class="text-button">Expressions</div>
      <v-spacer></v-spacer>
    </template>

    <ExpressionEditor
      ref="expressionEditor"
      v-on:snackbar="sendSnackbar($event)"
    />

    <v-card class="grey darken-3 custom-scrollbar" style="height: 240px; width: 100%; overflow-y: scroll; resize: vertical;">
      <v-list>
        <v-list-item-group>
          <v-list-item
            v-for="(item, idx) in value"
            :key="idx"
          >
            <v-list-item-action>
              <v-checkbox color="grey darken-4" v-model="item.active">
              </v-checkbox>
            </v-list-item-action>
            <v-list-item-content v-on:click="openExpressionEditor(item);">
              <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-action style="margin: 0px;">
              <v-menu v-model="item.colorEdit" top nudge-bottom="105" nudge-left="16" :close-on-content-click="false">
                <template v-slot:activator="{ on }">
                  <v-btn icon :color="item.color" v-on="on" class="pa-3">
                    <v-icon large>
                      mdi-label
                    </v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-text class="pa-0">
                    <v-color-picker :value="item.color" @input="updateColor(item, $event)" flat />
                  </v-card-text>
                </v-card>
              </v-menu>
            </v-list-item-action>
          </v-list-item>
          <v-list-item class="ma-2">
            <v-list-item-action>
            </v-list-item-action>
            <v-list-item-content @click.stop="addNewExpression($event);">
              <v-list-item-title>
                <v-icon>mdi-plus</v-icon>
                Add expression
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </NavigationDrawerRow>
</template>

<style>
.v-color-picker__input > input {
  color: #ffffff;
}
</style>

<script>
import { noMatchRegexString } from '../../utils/textRegex';

import InfoDialog from "../InfoDialog";
import ExpressionEditor from "../ExpressionEditor";
import NavigationDrawerRow from "./NavigationDrawerRow";

export default {
  name: "ExpressionList",

  components: {
    InfoDialog,
    ExpressionEditor,
    NavigationDrawerRow,
  },

  props: ["value"],

  methods: {
    sendSnackbar(event) {
      this.$emit("snackbar", event);
    },
    
    addNewExpression(event) {
      event.stopPropagation();

      const id = (this.value.length)
        ? this.value[this.value.length - 1].id + 1
        : 0;

      const newExpression = {
        id: id,
        name: `Expression ${id}`,
        active: false,
        expression: new RegExp(noMatchRegexString, ""),
        color: "#000000",
        colorEdit: false,
        colorTarget: "background-color",
      };

      this.value.push(newExpression);
      this.openExpressionEditor(newExpression);
    },

    openExpressionEditor(expression) {
      this.$refs.expressionEditor.openDialog(expression);
    },

    updateColor(expression, color) {
      expression.color = color;
      this.$set(this.value, this.value.indexOf(expression), expression);
    },
  },
};
</script>