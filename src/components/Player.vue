<template>
  <v-footer app padless v-show="visible">
    <v-card tile class="w-100" @click="dialog = true">
      <audio ref="audio" :src="songDetail.play_url" autoplay />
      <v-progress-linear
        :value="progressValue"
        class="my-0"
        height="3"
      ></v-progress-linear>
      <v-list class="py-0">
        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="songDetail.img"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ songDetail.album_name }}</v-list-item-title>
            <v-list-item-subtitle>{{
              songDetail.author_name
            }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-icon>
            <v-btn icon>
              <v-icon>mdi-rewind</v-icon>
            </v-btn>
          </v-list-item-icon>
          <v-list-item-icon :class="{ 'mx-5': $vuetify.breakpoint.mdAndUp }">
            <v-btn icon @click.stop="togglePlay">
              <v-icon>mdi-{{ playIcon }}</v-icon>
            </v-btn>
          </v-list-item-icon>
          <v-list-item-icon
            class="ml-0"
            :class="{ 'mr-3': $vuetify.breakpoint.mdAndUp }"
          >
            <v-btn icon>
              <v-icon>mdi-fast-forward</v-icon>
            </v-btn>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-card>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      dark
    >
      <v-card>
        <v-img :src="songDetail.img" class="player-bg"> </v-img>
        <v-toolbar>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-arrow-collapse-down</v-icon>
          </v-btn>
          <v-toolbar-title>{{ songDetail.album_name }}</v-toolbar-title>
        </v-toolbar>
        <div class="position-relative my-12 py-12 text-center">
          <v-avatar size="200" tile>
            <v-img :src="songDetail.img"> </v-img>
          </v-avatar>
          <div class="my-12 body-1 overflow-auto" style="height: 4rem">
            <!-- <transition-group name="fade">
              <p
                v-for="(item, k) in lrcObj"
                :key="k"
                v-show="k >= currentTime -2 && k < currentTime + 5"
              >
                {{ item }}
              </p>
            </transition-group> -->
            <!-- <p
              v-for="(item, i) in lrcArr"
              :key="i"
              v-show="item.k <= currentTime && item.k > currentTime - 5"
            >
              {{ i + ":" + item.k + "->" + item.v }}
              {{ lrcArr[i + 1] }}
            </p> -->
            <!-- <p
              v-for="(item, k) in lrcArr"
              :key="k"
              :class="{ 'red--text': k >= currentTime && k + 1 > currentTime }"
            >
              {{ k + ":" + item.k + "->" + item.v }}
            </p> -->
            {{ currentLrc }}
          </div>
          <div class="text-center">
            <v-btn icon outlined large>
              <v-icon>mdi-rewind</v-icon>
            </v-btn>
            <v-btn
              color="primary"
              fab
              x-large
              dark
              class="ma-6"
              @click.stop="togglePlay"
            >
              <v-icon>mdi-{{ playIcon }}</v-icon>
            </v-btn>
            <v-btn icon outlined large>
              <v-icon>mdi-fast-forward</v-icon>
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </v-footer>
</template>

<script>
import api from "../api/index.js";
import { mapState } from "vuex";
export default {
  name: "player",
  data() {
    return {
      visible: false,
      progressValue: 0,
      prev: null,
      playIcon: "play",
      next: null,
      currentTime: 0,
      currentLrc: "",
      songDetail: {
        play_url: "",
        img: "",
        album_name: "",
        author_name: "",
        lyrics: ""
      },
      dialog: false
    };
  },
  computed: {
    ...mapState(["songId"]),
    audio() {
      return this.$refs.audio || {};
    },
    lrcArr() {
      let arr = [];
      this.songDetail.lyrics.split("\n").forEach(item => {
        item = item.trim();
        let _item;
        if ((_item = item.match(/\[(\d{2}):(\d{2}\.\d{2})\](.*)/))) {
          arr.push({
            k: _item[1] * 60 + +_item[2],
            v: _item[3]
          });
        }
      });
      return arr;
    },
    lrcObj() {
      let obj = {};
      this.songDetail.lyrics.split("\n").forEach(item => {
        item = item.trim();
        let _item;
        // if ((_item = item.match(/([a-z]+):([^:]+)]/))) {
        //   obj[_item[1]] = _item[2];
        // } else
        if ((_item = item.match(/\[(\d{2}):(\d{2}\.\d{2})\](.*)/))) {
          obj[(_item[1] * 60 + +_item[2]).toFixed(0).toString()] = _item[3];
        }
      });
      return obj;
    },
    lrcMap() {
      let m = new Map();
      this.songDetail.lyrics.split("\n").forEach(item => {
        item = item.trim();
        let _item;

        if ((_item = item.match(/\[(\d{2}):(\d{2}\.\d{2})\](.*)/))) {
          m.set((_item[1] * 60 + +_item[2]).toFixed(0).toString(), _item[3]);
        }
      });
      return m;
    }
    // currentLrc() {
    //   return this.lrcObj[this.currentTime.toFixed(0)];
    // }
  },
  mounted() {
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
      audio.addEventListener("playing", () => {
        this.playIcon = "pause";
        this.$store.commit("playing", true);
      });
      audio.addEventListener("timeupdate", () => {
        // 歌曲当前播放时间
        this.currentTime = audio.currentTime;
        // 计算歌曲播放进度百分比
        this.progressValue = (audio.currentTime / audio.duration) * 100;
        // 计算当前显示的歌词
        let lrc = this.lrcArr.find((v, i, arr) => {
          let nextItem = arr[i + 1] || { k: Infinity };
          let prevItem = arr[i - 1] || { k: 0 };
          return prevItem.k < this.currentTime && nextItem.k > this.currentTime;
        });
        if (lrc) {
          this.currentLrc = lrc.v;
        }
      });
      audio.addEventListener("pause", () => {
        this.playIcon = "play";
      });
      audio.addEventListener("ended", () => {
        this.playIcon = "play";
      });
    }
  }
};
</script>
