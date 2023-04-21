import Vue from 'vue';

function showGames(request) {
    return Vue.prototype.$axios.post('/api/games/', request);
}
