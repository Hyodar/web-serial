<template>
  <v-card :color="colors[author]" :elevation="2" class="ma-2">
    <div>
      <v-card-subtitle class="ma-0 pa-2">
        {{ time }}
      </v-card-subtitle>
    </div>
    <v-card-text class="pa-2">
      {{ content }}
    </v-card-text>
  </v-card>
</template>

<script>
const colors = Object.freeze({
  self: "primary",
  serial: "secondary"
});

export default {
  name: "SerialChatMessage",

  props: ["content", "time", "author"],

  data: () => ({
    colors: colors
  })
};
</script>
