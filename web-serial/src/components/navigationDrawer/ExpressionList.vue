<template>
  <NavigationDrawerRow>
    <template v-slot:header>
      <InfoDialog label="Expressions">
        <p>
          The <b>expression</b> list is used for <b>expressions</b>
          that you'd like to highlight, for example a network packet.
        </p>
        <p>
          You can specify those using traditional RegEx and then choose any
          highlight color - <b> it's as simple as that. </b>
        </p>
        <p>
          However, note that the expressions are matched in the list order
          character per character, so if you want something to be matched
          with higher priority, it has to be on the top of the list.
        </p>
      </InfoDialog>
      <v-spacer></v-spacer>
      <div class="text-button"> Expressions </div>
      <v-spacer></v-spacer>
      <v-btn icon v-on:click="addNewExpression" small>
        <v-icon> mdi-plus </v-icon>
      </v-btn>
    </template>

    <ExpressionEditor
      ref="expressionEditor"
      v-on:snackbar="sendSnackbar($event)"
    />

    <v-card class="grey darken-3" style="height: 300px; width: 100%;" v-bar>
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
            <v-list-item-action>
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
        </v-list-item-group>
      </v-list>
    </v-card>
  </NavigationDrawerRow>
</template>

<style>
.v-color-picker__input > input {
  color: #ffffff;
}

.vb > .vb-dragger {
  z-index: 5;
  width: 12px;
  right: 0;
}

.vb > .vb-dragger > .vb-dragger-styler {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transform: rotate3d(0, 0, 0, 0);
  transform: rotate3d(0, 0, 0, 0);
  -webkit-transition:
    background-color 100ms ease-out,
    margin 100ms ease-out,
    height 100ms ease-out,
    top 300ms ease-out;
  transition:
    background-color 100ms ease-out,
    margin 100ms ease-out,
    height 100ms ease-out,
    top 300ms ease-out;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 5px 5px 5px 0;
  border-radius: 20px;
  height: calc(100% - 10px);
  display: block;
}

.vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
  background-color: rgba(255, 255, 255, 0.3);
}

.vb > .vb-dragger:hover > .vb-dragger-styler {
  background-color: rgba(255, 255, 255, 0.5);
  margin: 0px;
  height: 100%;
}

.vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
  background-color: rgba(255, 255, 255, 0.5);
  margin: 0px;
  height: 100%;
}

.vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
  background-color: rgba(255, 255, 255, 0.5);
}

.vb-content {
  scroll-behavior: smooth;
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

  data: () => ({
    expressionCount: 0,
  }),

  methods: {
    sendSnackbar(event) {
      this.$emit("snackbar", event);
    },
    
    addNewExpression() {
      const id = this.expressionCount++;

      this.value.push({
        id: id,
        name: `Expression ${id}`,
        active: false,
        expression: new RegExp(noMatchRegexString, ""),
        color: "#000000",
        colorEdit: false,
        colorTarget: "background-color",
      });
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