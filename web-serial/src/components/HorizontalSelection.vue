<template>
  <v-row :class="[(dense)? 'ma-0' : 'ma-3']" justify="center">
    <v-btn
      tile
      v-for="option in options"
      v-bind:key="option.val"
      v-on:click="changeValue(option.val)"
      :class="[(isOptionActive(option.val))? 'grey darken-2' : undefined,
                (dense)? 'pa-1' : undefined]"
    >
      {{ option.name }}
    </v-btn>
  </v-row>
</template>

<script>
export default {
  name: "HorizontalSelection",

  data: () => ({
    activeValue: null,
  }),

  mounted: function() {
    this.activeValue = this.value;
  },

  props: ["options", "value"],

  methods: {
    changeValue(newValue) {
      if (this.multiple) {
        if (this.isOptionActive(newValue)) {
          this.activeValue = this.activeValue.filter(el => el !== newValue);
        }
        else {
          this.activeValue.push(newValue);
        }

        this.$emit("changedValue", this.activeValue);
        return;
      }

      this.$emit("changedValue", newValue);
    },

    isOptionActive(value) {
      if (this.multiple) {
        return this.activeValue && this.activeValue.indexOf(value) !== -1;
      }
      return this.value === value;
    }
  },

  
  computed: {
    multiple: function() {
      return this.$attrs.multiple !== undefined;
    },

    dense: function() {
      return this.$attrs.dense !== undefined;
    }
  }
}
</script>