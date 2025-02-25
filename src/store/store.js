import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
// // 引入数据
import state from './state'
import mutations from './mutations'
import actions from './actions'

export default new Vuex.Store({
    state,
    mutations,
    actions,
});
