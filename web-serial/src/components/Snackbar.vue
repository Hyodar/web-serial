<template>
  <v-snackbar
    top
    v-if="isOn"
    v-model="content"
    :color="content.color"
    :timeout="content.timeout"
  >
    {{ content.content }}
    <v-btn
      text
      v-for="(button, idx) in content.buttons"
      v-bind:key="idx"
      v-on:click="button.callback"
    >
      {{ button.text }}
    </v-btn>
    <v-btn text v-on:click="isOn = false"> Close </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: "Snackbar",

  props: ["content"],

  data: () => ({
    isOn: false
  }),

  watch: {
    content: function() {
      this.isOn = true;
    }
  }
};
</script>
