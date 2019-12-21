<template>
  <v-container fluid>
    <v-list>
      <v-list-item v-for="item in items" :key="item.rankname">
        <v-list-item-avatar tile>
          <v-img :src="item.imgurl"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="item.rankname"></v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon>mdi-chevron-right</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import api from "../api/index.js";

export default {
  name: "rank",
  data() {
    return {
      items: []
    };
  },
  created() {
    api.getRank().then(({ data }) => {
      let info = data.info;
      info.forEach(v => {
        v.imgurl = v.imgurl.replace("{size}", 400);
      });
      this.items = info;
    });
  }
};
</script>

<style>
</style>