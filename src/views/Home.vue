<template>
  <v-container fluid>
    <v-carousel cycle height="150" hide-delimiters :show-arrows="false">
      <v-carousel-item
        v-for="slide in slides"
        :key="slide.id"
        :src="slide.imgurl"
      ></v-carousel-item>
    </v-carousel>
    <v-list
      v-touch="{
        left: () => $router.push('/rank'),
        down: swipeDown
      }"
    >
      <v-list-item
        v-for="item in songs"
        :key="item.album_audio_id"
        @click="setSongId(item.hash)"
      >
        <v-list-item-content>
          <v-list-item-title v-text="item.filename"></v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon color="grey">mdi-play-outline</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import api from "../api/index.js";

export default {
  name: "home",
  data() {
    return {
      slides: [],
      songs: []
    };
  },
  created() {
    this.getHomeData();
  },
  methods: {
    getHomeData() {
      api.getHomeData().then(({ banner, data }) => {
        this.slides = banner;
        this.songs = data;
      });
    },
    setSongId(hash) {
      this.$store.commit("setSongId", hash);
    },
    swipeDown() {
      this.getHomeData()
      console.log('swipeDown')
    }
  }
};
</script>
