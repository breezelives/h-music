<template>
  <v-container fluid>
    <div v-for="(item,i) in playlist" :key="item.specialid">
      <div class="d-flex flex-no-wrap" :class="{'mb-2': playlist.length-1 != i}">
        <v-avatar size="100" tile>
          <v-img :src="item.imgurl"></v-img>
        </v-avatar>
        <div>
          <v-card-title class="subtitle-1" v-text="item.specialname"></v-card-title>
          <v-card-subtitle class="grey--text pb-0">
            <v-icon class="subtitle-1">mdi-headphones</v-icon>
            <span>{{item.playcount}}</span>
          </v-card-subtitle>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import api from "../api/index.js";

export default {
  name: "list",
  data() {
    return {
      playlist: []
    };
  },
  created() {
    this.getSongList();
  },
  methods: {
    getSongList() {
      api.getSongList().then(data => {
        this.playlist = data;
      });
    }
  }
};
</script>

<style>
</style>