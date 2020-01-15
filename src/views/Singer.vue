<template>
  <v-container><v-list>
      <v-list-item
        v-for="item in list"
        :key="item.classid"
        @click="getSingerByClass(item.classid)"
      >
        <v-list-item-avatar tile>
          <v-img :src="item.imgurl"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="item.classname"></v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon>mdi-chevron-right</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list></v-container>
</template>

<script>
import api from '../api/index.js'
export default {
  name: "singer",
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getSingerClass()
  },
  methods: {
    getSingerClass() {
      api.getSingerClass().then(({list}) => {
        this.list = list
      })
    },
    getSingerByClass(classid) {
      api.getSingerByClass(classid).then(res => {
        console.log(res)
      })
    }
  }
};
</script>
