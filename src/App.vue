<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>西子音乐</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <template v-slot:extension>
        <v-tabs
          v-model="tabs"
          fixed-tabs
          light
          color="primary"
          background-color="white"
        >
          <v-tab
            v-for="(menu, i) in menus"
            :key="menu.value"
            :value="menu.value"
            @click="
              tabs = i;
              goto('/' + menu.value);
            "
          >
            {{ menu.label }}
            <!-- <v-icon>mdi-{{menu.icon}}</v-icon> -->
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-content :style="{ paddingBottom: playing ? '70px' : 0 }">
      <keep-alive>
        <router-view />
      </keep-alive>
    </v-content>

    <Player />

    <v-snackbar v-model="snackbar.visible">
      {{ snackbar.text }}
      <v-btn color="pink" text @click="snackbar.visible = false">
        Close
      </v-btn>
    </v-snackbar>
    <!-- <v-bottom-navigation app :value="$route.name" grow color="primary">
      <v-btn
        v-for="menu in menus"
        :key="menu.value"
        :value="menu.value"
        @click="$router.push('/' + menu.value)"
      >
        <span>{{menu.label}}</span>
        <v-icon>mdi-{{menu.icon}}</v-icon>
      </v-btn>
    </v-bottom-navigation>-->
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
    Player: () => import("@/components/Player.vue")
  },
  data() {
    return {
      tabs: 0,
      menus: [
        {
          label: "新歌",
          value: "home",
          icon: "library-music-outline"
        },
        {
          label: "排行",
          value: "rank",
          icon: "fire"
        },
        {
          label: "歌单",
          value: "list",
          icon: "playlist-music-outline"
        },
        {
          label: "歌手",
          value: "singer",
          icon: "account-star-outline"
        }
      ],
      snackbar: {
        visible: false,
        text: ""
      }
    };
  },
  computed: {
    ...mapState(["playing"])
    //   title() {
    //     let currentMenu = this.menus.find(v => v.value == this.$route.name);
    //     return currentMenu ? currentMenu.label : "西子音乐";
    //   }
  },
  mounted() {
    document.cookie = "kg_mid=" + String(Math.random()).slice(2);
  },
  methods: {
    goto(path) {
      this.$router.push(path);
    },
    swipe(direction) {
      this.snackbar.text = direction;
      this.snackbar.visible = true;
    }
  }
};
</script>
