// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store.js";
import 'normalize.css'
import './styles/index.scss'
import {Button, Container, Aside, Main, Form, FormItem, Input, Table, TableColumn, Tag, Switch} from 'element-ui';
Vue.use(Button)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tag)
Vue.use(Switch)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
