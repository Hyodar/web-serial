<template>
  <v-navigation-drawer v-model="active" app right width="350">
    <v-container v-for="(menu, idx) in menus" v-bind:key="idx">
      <v-row class="ma-1 mt-5" justify="center">
        <div class="text-button"> {{ menu.name }} </div>
      </v-row>

      <v-divider class="ma-2"></v-divider>

      <v-row class="ma-3" justify="center">
        <v-btn
          tile
          v-for="option in menu.options"
          v-bind:key="option.val"
          v-on:click="optionData[menu.optionName] = option.val"
          :class="(option.val === optionData[menu.optionName])? 'grey darken-2' : undefined">
          {{ option.name }}
        </v-btn>
      </v-row>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
export default {
    name: "NavigationDrawer",

    props: ["active", "menus", "optionData"],

    data: () => ({})
}
</script>