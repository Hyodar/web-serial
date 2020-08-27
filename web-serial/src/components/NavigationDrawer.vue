<template>
  <v-navigation-drawer :value="value" v-on:input="emitToggle" app right width="350">
    <v-expansion-panels flat multiple accordion v-model="openedPanels">
      <slot></slot>
    </v-expansion-panels>
    <BottomInfo />
  </v-navigation-drawer>
</template>

<style>
.v-navigation-drawer__content::-webkit-scrollbar-track {
	border-radius: 10px;
	background-color: #f5f5f500;
}

.v-navigation-drawer__content::-webkit-scrollbar {
	width: 6px;
	background-color: #f5f5f500;
}

.v-navigation-drawer__content::-webkit-scrollbar-thumb {
	border-radius: 10px;
	background-color: #ffffff42;
}
</style>

<script>
import BottomInfo from "./navigationDrawer/BottomInfo";

export default {
  name: "NavigationDrawer",

  components: {
    BottomInfo,
  },

  props: ["value"],

  data: () => ({
    openedPanels: [0, 1, 2],
  }),

  methods: {
    emitToggle(event) {
      this.$emit("input", event);
    },
  },
}
</script>
