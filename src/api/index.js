import Vue from 'vue'
function transformImgUrl(list, k, size = 400) {
    list.forEach(v => {
        v[k] = v[k].replace("{size}", size);
    });
    return list;
}
export default {
    getCategory() {
        return Vue.axios.get('/api/v3/tag/list?pid=0&apiver=2&plat=0')
    },
    getRank() {
        return Vue.axios.get('/api/v3/rank/list?version=9108&plat=0&showtype=2&parentid=0&apiver=6&area_code=1&withsong=1')
    },
    getRecommend() {
        return Vue.axios.get('/api/v5/special/recommend?recommend_expire=0&sign=52186982747e1404d426fa3f2a1e8ee4&plat=0&uid=0&version=9108&page=1&area_code=1&appid=1005&mid=286974383886022203545511837994020015101&_t=1545746286').then(({ data }) => {
            return transformImgUrl(data.list, "imgurl");
        });
    },
    getHomeData() {
        return Vue.axios.get('/m/?json=true')
    },
    getSong(hash) {
        return Vue.axios.get(`/kugou/yy/index.php?r=play/getdata&hash=${hash}`)
    }
}

