<template>
  <NavigationDrawerRow label="Log Mode">
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

import LogMode from "../../utils/enums/LogMode";

export default {
  name: "LogModeOptions",
  
  components: {
    NavigationDrawerRow,
    HorizontalSelection,
  },

  props: ["value"],

  data: () => ({
    options: Object.entries(LogMode).map(entry => ({
      name: entry[0], val: entry[1]
    }))
  }),

  methods: {
    updateValue(event) {
      this.$emit("input", event);
    }
  }
}
</script>