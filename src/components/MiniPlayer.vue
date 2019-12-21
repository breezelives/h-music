<template>
  <v-footer app padless v-show="visible">
    <v-card tile class="w-100">
      <audio ref="audio" :src="songDetail.play_url" autoplay />
      <v-progress-linear :value="progressValue" class="my-0" height="3"></v-progress-linear>
      <v-list class="py-0">
        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="songDetail.img"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{songDetail.album_name}}</v-list-item-title>
            <v-list-item-subtitle>{{songDetail.author_name}}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-icon>
            <v-btn icon>
              <v-icon>mdi-rewind</v-icon>
            </v-btn>
          </v-list-item-icon>

          <v-list-item-icon :class="{ 'mx-5': $vuetify.breakpoint.mdAndUp }">
            <v-btn icon @click="togglePlay">
              <v-icon>mdi-{{playIcon}}</v-icon>
            </v-btn>
          </v-list-item-icon>

          <v-list-item-icon class="ml-0" :class="{ 'mr-3': $vuetify.breakpoint.mdAndUp }">
            <v-btn icon>
              <v-icon>mdi-fast-forward</v-icon>
            </v-btn>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-card>
  </v-footer>
</template>

<script>
import api from "../api/index.js";
import { mapState } from "vuex";
export default {
  name: "miniPlayer",
  // props: {
  //   songId: {
  //     type: String,
  //     default() {
  //       return this.$store.state.songId;
  //     }
  //   }
  // },
  data() {
    return {
      visible: false,
      progressValue: 0,
      prev: null,
      playIcon: "play",
      next: null,
      songDetail: {
        play_url: "",
        img: "",
        album_name: "",
        author_name: ""
      }
    };
  },
  computed: {
    ...mapState(["songId"]),
    audio() {
      return this.$refs.audio || {};
    }
  },
  mounted() {
    // this.$store.commit("getAudio", this.$refs.audio);
    this.addEvent();
  },
  watch: {
    songId() {
      this.getSong();
    }
  },
  methods: {
    getSong() {
      if (this.songId) {
        api.getSong(this.songId).then(({ data }) => {
          this.songDetail = data;
          this.visible = true;
          this.$store.commit("playing", true);
        });
      }
    },
    togglePlay() {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
      }
    },
    addEvent() {
      let audio = this.$refs.audio;
      let timer = null;
      audio.addEventListener("playing", () => {
        this.playIcon = "pause";
        timer = setInterval(() => {
          this.progressValue = audio
            ? (audio.currentTime / audio.duration) * 100
            : 0;
        }, 100);
      });
      audio.addEventListener("pause", () => {
        this.playIcon = "play";
        clearInterval(timer);
      });
      audio.addEventListener("ended", () => {
        this.playIcon = "play";
        clearInterval(timer);
      });
    }
  }
};
</script>
