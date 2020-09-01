<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon medium>
          mdi-cog
        </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar>
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Settings</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="restoreDefaults">Restore defaults</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-list three-line subheader>
        <v-subheader>Encoding</v-subheader>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Encoding</v-list-item-title>
            <v-list-item-subtitle>Encoding standard of input sent to serial</v-list-item-subtitle>
            <v-combobox
              :items="encodings"
              :value="encodeTo"
              :rules="[el => (encodings.indexOf(el) !== -1) || 'Encoding doesn\'t exist - defaulted to latin-1/ISO 8859-1']"
              v-on:change="$emit('update:encodeTo', encodings.find(el => el == $event) || defaultValues.encodeTo)"
            />
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Decoding</v-list-item-title>
            <v-list-item-subtitle>Encoding standard of received serial data</v-list-item-subtitle>
            <v-combobox
              :items="encodings"
              :value="decodeFrom"
              :rules="[el => (encodings.indexOf(el) !== -1) || 'Encoding doesn\'t exist - defaulted to latin-1/ISO 8859-1']"
              v-on:change="$emit('update:decodeFrom', encodings.find(el => el == $event) || defaultValues.decodeTo)"
            />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list three-line subheader>
        <v-subheader>Advanced Options</v-subheader>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Message Buffer Size</v-list-item-title>
            <v-list-item-subtitle>Maximum number of serial "messages" held at a time</v-list-item-subtitle>
            <v-text-field
              type="number"
              min="0"
              :value="messageBufferSize"
              :rules="[v => v >= 0 || 'Must be positive or zero']"
              v-on:change="$emit('update:messageBufferSize', parseInt($event) || 0)"
            />
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Scan Buffer Size</v-list-item-title>
            <v-list-item-subtitle>Maximum length of string buffer used for command RegEx matches (increase this if you have big sequences)</v-list-item-subtitle>
            <v-text-field
              type="number"
              min="0"
              :value="scanBufferSize"
              :rules="[v => v >= 0 || 'Must be positive or zero']"
              v-on:change="$emit('update:scanBufferSize', parseInt($event) || 0)"
            />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ConfigurationMenu",

  props: {
    scanBufferSize: {
      type: Number,
      required: true,
    },
    messageBufferSize: {
      type: Number,
      required: true,
    },
    decodeFrom: {
      type: String,
      required: true,
    },
    encodeTo: {
      type: String,
      required: true,
    },
  },

  mounted() {
    this.restoreDefaults();

    if (!this.encodings.length) {
      import("iconv-lite/encodings").then(encodingsObj => {
        this.encodings = Object.keys(encodingsObj);
      });
    }
  },

  data: () => ({
    dialog: false,
    encodings: [],
    defaultValues: {
      scanBufferSize: 1024,
      messageBufferSize: 512,
      decodeFrom: "iso88591",
      encodeTo: "iso88591",
    },
  }),

  methods: {
    restoreDefaults() {
      Object.entries(this.defaultValues).forEach(([key, val]) => {
        this.$emit(`update:${key}`, val);
      });
    },
  }
}
</script>