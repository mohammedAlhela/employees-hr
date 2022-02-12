






require('./bootstrap')

import Vue from 'vue'
import App from './components/App.vue'
import router from './router'

import store from './store/index'


import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify)

window.Vue = require('vue') ;
Vue.component('App' , require ("./components/App.vue").default)



global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;




import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)




import deleteConfirm from "./components/reusable/deleteConfirm.vue";
import navigationUpbar from "./components/reusable/navigationUpbar.vue";

 Vue.component("delete-confirm", deleteConfirm);
 Vue.component("navigation-upbar", navigationUpbar);


import Swal from 'sweetalert2'
window.Swal = Swal
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: toast => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

window.Toast = Toast

const app = new Vue({
    el: '#app',
    components: { App },
    router,
    vuetify: new Vuetify(), // to access $vuetify inside your Vue components
    store
})
