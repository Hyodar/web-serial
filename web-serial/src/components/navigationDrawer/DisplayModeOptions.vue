<template>
  <NavigationDrawerRow label="Display Mode">
    <HorizontalSelection
      :options="options"
      :value="value"
      v-on:changedValue="updateValue($event)"
    />
  </NavigationDrawerRow>
</template>

<script>
import NavigationDrawerRow from "./NavigationDrawerRow";
import HorizontalSelection from "../HorizontalSelection";

import DisplayMode from "../../utils/enums/DisplayMode";

export default {
  name: "DisplayModeOptions",
  
  components: {
    NavigationDrawerRow,
    HorizontalSelection,
  },

  props: ["value"],

  data: () => ({
    options: Object.entries(DisplayMode).map(entry => ({
      name: entry[0], val: entry[1]
    })),
  }),

  methods: {
    updateValue(event) {
      this.$emit("input", event);
    },
  },
};
</script>