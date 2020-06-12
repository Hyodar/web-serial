<template>
  <v-card
    v-if="!showAsTerminal"
    dense
    :color="colors[author]"
    :elevation="2"
    class="ma-2 mr-4"
    style="font-family: monospace;"
  >
    <div>
      <v-card-subtitle class="ma-0 pa-2 offwhite-text">
        {{ time }}
      </v-card-subtitle>
    </div>
    <v-card-text class="pa-0 pd-1 pl-2 offwhite-text">
      {{ content }}
    </v-card-text>
  </v-card>
  <span v-else style="font-family: monospace;">
    <span :class="[colors[author]]"> >> </span>
    {{ time }} - {{ content }}
    <br />
  </span>
</template>

<style scoped>
.offwhite-text {
  color: rgba(255, 255, 255, 0.9) !important;
}
</style>

<script>
const colors = Object.freeze({
  self: "primary",
  serial: "secondary"
});

export default {
  name: "SerialChatMessage",

  props: ["content", "time", "author", "showAsTerminal"],

  data: () => ({
    colors: colors
  })
};
</script>
