<template>
  <v-snackbar
    top
    v-if="content"
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
    <v-btn text v-on:click="content = null"> Close </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: "Snackbar",

  props: ["content"],

  data: () => ({
    isOn: false
  })
};
</script>
