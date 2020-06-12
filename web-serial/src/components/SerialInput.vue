<template>
  <v-container class="grey darken-3" style="height: 20%;">
    <v-textarea
      v-model="message"
      outlined
      autocomplete="off"
      @keyup.enter.exact="sendMessage()"
    ></v-textarea>
  </v-container>
</template>

<script>
export default {
  name: "SerialInput",

  data: () => ({
    message: ""
  }),

  methods: {
    sendMessage() {
      this.$emit("sendMessage", this.message);
      this.message = "";
    }
  }
};
</script>
