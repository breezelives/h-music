<template>
  <v-card>
    <v-toolbar color="deep-purple accent-4" dark flat>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-toolbar-title>西子音乐</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <template v-slot:extension>
        <!-- <v-tabs
          v-model="currentItem"
          background-color="transparent"
          fixed-tabs
          slider-color="white"
        >
          <v-tab v-for="(item,i) in items" :key="i" >{{ item.label }}</v-tab>
        </v-tabs>-->
      </template>
    </v-toolbar>

    <v-tabs-items v-model="currentItem">
      <v-tab-item v-for="item in items" :key="item.label" :value="item.href">
        <v-card flat>
          <v-card-text>
            <h2>{{ item.label }}</h2>
            {{ text }}
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    currentItem: "recommend",
    items: [
      {
        label: "推荐",
        value: "recommend"
      },
      {
        label: "排行",
        value: "rank"
      },
      {
        label: "分类",
        value: "category"
      },
      {
        label: "歌手",
        value: "singer"
      }
    ],
    more: ["News", "Maps", "Books", "Flights", "Apps"],
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  }),

  methods: {
    addItem(item) {
      const removed = this.items.splice(0, 1);
      this.items.push(...this.more.splice(this.more.indexOf(item), 1));
      this.more.push(...removed);
      this.$nextTick(() => {
        this.currentItem = "tab-" + item;
      });
    }
  }
};
</script>