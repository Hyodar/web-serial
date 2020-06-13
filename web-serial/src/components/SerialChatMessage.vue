<template>
  <v-card
    v-if="!showAsTerminal"
    :id="`msg-${id}`"
    dense
    :color="colors[author]"
    :elevation="2"
    class="ma-2 mr-4"
    style="font-family: monospace;"
  >
    <div>
      <v-card-subtitle class="ma-0 pa-2 pb-0 offwhite-text">
        {{ id }} - {{ time }}
      </v-card-subtitle>
    </div>
    <v-card-text class="pa-0 pd-1 pl-2 mt-0 offwhite-text">
      {{ content }}
    </v-card-text>
  </v-card>
  <span v-else :id="`msg-${id}`" style="font-family: monospace;">
    <span :class="[colors[author]]"> >> </span>
    {{ id }} - {{ time }} - {{ content }}
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

  props: ["id", "content", "time", "author", "showAsTerminal"],

  data: () => ({
    colors: colors
  })
};
</script>
