<template>
  <v-expansion-panel class="transparent">
    <v-expansion-panel-header>
      <v-row class="ma-1" justify="center">
        <slot name="header">
          <div class="text-button">{{ label }}</div>
        </slot>
      </v-row>
    </v-expansion-panel-header>
    <v-expansion-panel-content class="navigation-drawer-row-content">
      <v-divider></v-divider>
      <v-row class="ma-3 mb-0" justify="center" align="center">
        <slot></slot>
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<style>
.navigation-drawer-row-content > div {
  padding: 0px;
}
</style>

<script>
export default {
  name: "NavigationDrawerRow",

  props: {
    label: String,
  },
};
</script>