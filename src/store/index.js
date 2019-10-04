import Vue from 'vue'
import vuex from 'vuex'
import city from './city'
Vue.use(vuex)
export default new vuex.Store({
    state:{

    },
    mutations:{

    },
    getters:{

    },
    modules:{// modules引入子状态管理
        city
    }
})
