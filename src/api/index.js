import Vue from "vue";
function transformImgUrl(list, k = "imgurl", size = 400) {
  list.forEach(v => {
    v[k] = v[k].replace("{size}", size);
  });
  return list;
}
export default {
  // 获取首页新歌曲榜单和banner图片列表
  getHomeData() {
    return Vue.axios.get("/m/?json=true");
  },
  // 获取音乐排行榜
  getRankList() {
    return Vue.axios
      .get("/m/rank/list&json=true")
      .then(({ rank }) => transformImgUrl(rank.list));
  },
  // 获取排行榜分类歌曲列表
  getRankInfo(rankid) {
    return Vue.axios.get(`/m/rank/info/?rankid=${rankid}&page=1&json=true`);
  },
  // 获取歌单
  getSongList() {
    return Vue.axios
      .get(`/m/plist/index&json=true`)
      .then(({ plist }) => transformImgUrl(plist.list.info));
  },
  // 获取歌单下的音乐列表
  getListById(id) {
    return Vue.axios.get(`/m/plist/list/${id}?json=true`);
  },
  // 获取歌手分类
  getSingerClass() {
    return Vue.axios.get("/m/singer/class&json=true");
  },
  // 歌手分类下面的歌手列表
  getSingerByClass(classid) {
    return Vue.axios.get(`/m/singer/list/${classid}?json=true`);
  },

  // 获取音乐详情-带歌词
  // hash: 音乐列表下的音乐id
  getSong(hash) {
    return Vue.axios.get(`/kugou/yy/index.php?r=play/getdata&hash=${hash}`);
  }
};
