<template>
  <NavigationDrawerRow>
    <div class="text-caption text-center pa-3">
      Made by <a href="https://github.com/Hyodar">Hyodar</a> and powered
      by Vue.js and Vuetify.
    </div>
  </NavigationDrawerRow>
</template>

<script>
import NavigationDrawerRow from "./NavigationDrawerRow";

export default {
  name: "BottomInfo",

  components: {
    NavigationDrawerRow,
  },
};
</script>
