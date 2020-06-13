<template>
  <v-container class="grey darken-3" style="height: 150px;">
    <v-textarea
      v-model="message"
      outlined
      hide-details
      autocomplete="off"
      height="130px"
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
