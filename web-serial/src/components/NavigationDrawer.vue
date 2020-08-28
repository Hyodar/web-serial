<template>
  <v-navigation-drawer :value="value" v-on:input="emitToggle" app right width="350">
    <draggable tag="v-expansion-panels" :component-data="getExpansionPanelsOptions()" ghost-class="being-dragged">
      <slot></slot>
    </draggable>
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

<style scoped>
.being-dragged {
  opacity: 0.5;
}
</style>

<script>
import draggable from "vuedraggable";
import BottomInfo from "./navigationDrawer/BottomInfo";

export default {
  name: "NavigationDrawer",

  components: {
    BottomInfo,
    draggable,
  },

  props: ["value"],

  data: () => ({
    openedPanels: [0, 1, 2],
  }),

  methods: {
    emitToggle(event) {
      this.$emit("input", event);
    },
    
    getExpansionPanelsOptions() {
      return {
        on: {
          input: this.emitToggle,
        },
        attrs: {
          flat: true,
          multiple: true,
          accordion: true,
        },
        props: {
          value: this.openedPanels,
        }
      };
    },
  },
}
</script>
