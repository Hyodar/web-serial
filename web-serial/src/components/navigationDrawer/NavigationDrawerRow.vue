<template>
  <v-expansion-panel style="background-color: transparent;">
    <v-expansion-panel-header class="elevation-2" style="border-bottom: 1px solid #ffffff33">
      <span class="drag-handle grippy"></span>
      <v-row class="ma-1" justify="center">
        <slot name="header">
          <div class="text-button">{{ label }}</div>
        </slot>
      </v-row>
    </v-expansion-panel-header>
    <v-expansion-panel-content class="navigation-drawer-row-content">
      <v-row class="ma-3" justify="center" align="center">
        <slot></slot>
      </v-row>
      <v-divider></v-divider>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<style>
.navigation-drawer-row-content > div {
  padding: 0px;
}

.navigation-drawer-row-content {
  background-color: #00000022;
}
</style>

<style scoped>
.drag-handle {
  position: absolute;
  left: 0px;
}

/* From https://codepen.io/zachariab/pen/wkrbc */
/* ------------------------------------------- */
span.grippy {
  content: '....';
  width: 10px;
  height: 20px;
  display: inline-block;
  /* overflow: hidden; */
  line-height: 5px;
  padding: 3px 4px;
  cursor: move;
  vertical-align: middle;
  margin-top: -.7em;
  margin-right: .3em;
  font-size: 12px;
  font-family: sans-serif;
  letter-spacing: 2px;
  color: #cccccc;
  text-shadow: 1px 0 1px black;
}

span.grippy::after {
  content: '.. .. .. ..';
}
/* ------------------------------------------- */
</style>

<script>
export default {
  name: "NavigationDrawerRow",

  props: {
    label: String,
  },
};
</script>