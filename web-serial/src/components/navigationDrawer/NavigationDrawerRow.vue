<template>
  <v-container>
    <v-row class="ma-1 mt-5" justify="center">
      <slot name="header">
        <div class="text-button"> {{ label }} </div>
      </slot>
    </v-row>
    <v-divider class="ma-2"></v-divider>
    <v-row class="ma-3 mb-0" justify="center" align="center">
      <slot></slot>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "NavigationDrawerRow",

  props: {
    label: String,
  },
};
</script>