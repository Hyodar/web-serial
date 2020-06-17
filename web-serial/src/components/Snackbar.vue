<template>
  <v-snackbar
    top
    v-model="isOn"
    v-if="isOn"
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

  data: () => ({
    isOn: false,
    content: null
  }),

  methods: {
    setMessage(msg) {
      this.content = msg;
    }
  },

  watch: {
    content: function() {
      this.isOn = true;
    }
  }
};
</script>
