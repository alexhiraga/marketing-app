import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'https://curso-vue-42a1d-default-rtdb.firebaseio.com/'

Vue.use({
    install(Vue) {
        // Vue.prototype.$http = axios
        Vue.prototype.$http = axios.create({
            baseURL: 'https://curso-vue-42a1d-default-rtdb.firebaseio.com/',
            headers: {
                // get: {
                //     "Authorization": "test"
                // }
            }
        })

        Vue.prototype.$http.interceptors.request.use(config => {
            return config
        }, error => Promise.reject(error))

        Vue.prototype.$http.interceptors.response.use(res => {
            const array = []
            for(let chave in res.data){
                array.push({
                    id: chave, ...res.data[chave]
                })
            }

            res.data = array
            return res
        }, error => Promise.reject(error))

    }
})