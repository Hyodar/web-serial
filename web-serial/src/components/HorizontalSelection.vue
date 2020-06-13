<template>
  <v-row class="ma-3" justify="center">
    <v-btn
      tile
      v-for="option in options"
      v-bind:key="option.val"
      v-on:click="changeValue(option.val)"
      :class="(option.val === value)? 'grey darken-2' : undefined">
      {{ option.name }}
    </v-btn>
  </v-row>
</template>

<script>
export default {
  name: "HorizontalSelection",

  props: ["options", "value"],

  methods: {
    changeValue(newValue) {
      this.$emit("changedValue", newValue);
    }
  }
}
</script>