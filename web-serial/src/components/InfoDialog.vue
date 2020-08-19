<template>
  <v-dialog v-model="dialog" max-width="400px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on" small class="grey darken-3">
        <v-icon>
          mdi-information
        </v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        <span class="headline">{{ label }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <slot></slot>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text v-on:click="dialog = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "InfoDialog",

  props: ["label"],

  data: () => ({
    dialog: false,
  }),
};
</script>
