<template>
  <div id="app">
    <my-header v-bind:seller="seller"></my-header>
    <div class="nav border-1px">
      <div class="nav-item"><router-link to="goods">商品</router-link></div>
      <div class="nav-item"><router-link to="ratings">评价</router-link></div>
      <div class="nav-item"><router-link to="seller">商家</router-link></div>
    </div>
    <div class="content">
      <router-view v-bind:seller="seller"></router-view>
    </div>
  </div>
</template>

<script>
import Header from './components/Header'
import Goods from './components/Goods'
import Ratings from './components/Ratings'
import Seller from './components/Seller'
import axios from 'axios'
export default {
  name: 'App',
  components: {
    'my-header': Header,
    'my-goods': Goods,
    'my-ratings': Ratings,
    'my-seller': Seller
  },
  data () {
    return {
      seller: {},
      goods: []
    }
  },
  created () {
    axios.get('/good/seller').then(res => {
      if (res.data.code === 0) {
        this.seller = res.data.data
        this.$store.commit('initData', res.data.data)
      }
    })
  }
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
@import url("./style.css");
@import url("./reset.css");
@import "./stylus/index.styl";
#app
  .nav
    display: flex
    height: 40px
    line-height: 40px
    border-1px(rgba(240,20,20,0.1))
    .nav-item
      flex: 1
      text-align: center
      font-size: 14px
      color: rgb(77,85,93)
      a
        width: 100%
        height: 100%
        display: block
      a.router-link-exact-active.router-link-active
        color: rgb(240,20,20)

</style>
