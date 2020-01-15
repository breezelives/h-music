<template>
  <v-container fluid>
    <v-toolbar>
      <v-btn icon @click="$router.back()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>{{ songDetail.album_name }}</v-toolbar-title>
    </v-toolbar>
  </v-container>
</template>

<script>
export default {
  name: "singerList",
  data() {
    return {
      title: ""
    };
  }
};
</script>
