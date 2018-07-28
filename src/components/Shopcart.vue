<template>
  <div id="shopcart">
    <div class="cart-list-wrapper" v-show="show && $store.getters.hasGoodList">
      <div class="cart-gray" @click="toggleShow"></div>
      <div class="cart-list">
        <div class="cart-list-header border-1px-bottom">
          <span class="cart-title">购物车</span><span class="clear" @click="clear">清空</span>
        </div>
        <div class="cart-food-item" v-for="(item, index) in goodsList" :key="index">
          <span class="food-name">{{item.name}}</span>
          <span class="food-price">¥{{item.price}}</span>
          <div class="cart-control-wrapper">
            <my-cartcontrol :food="item"></my-cartcontrol>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="chart-icon-wrapper">
        <div class="chart-icon icon-shopping_cart" :class="{noZChart: totalCount!=0}" @click="toggleShow">
        </div>
        <div class="total-count" v-show="totalCount">{{totalCount}}</div>
      </div>
      <div class="deliver-fee">
        <div class="price border-1px-right" :class="{noZChart: totalPrice!=0}">¥{{totalPrice}}</div>
        <div class="deliveryPrice">另需配送费{{deliveryPrice}}元</div>
      </div>
      <div class="deliver-base" :class="{ok: inform==`去结算`}">
        {{inform}}
      </div>
    </div>
  </div>
</template>
<script>
import CartControl from './CartControl'
import { mapGetters } from 'vuex'
export default {
  name: 'shopcart',
  data () {
    return {
      show: false
    }
  },
  methods: {
    toggleShow () {
      if (this.$store.getters.hasGoodList) {
        this.show = !this.show
      }
    },
    clear () {
      this.$store.commit('empty')
    }
  },
  props: {
    deliveryPrice: {
      type: Number
    },
    minPrice: {
      type: Number
    },
    food: {
      type: Object
    }
  },
  components: {
    'my-cartcontrol': CartControl
  },
  watch: {
    hasGoodList: function () {
      if (this.hasGoodList === 0) {
        this.show = false
      }
    }
  },
  computed: {
    goodsList () {
      return this.$store.state.goodsList
    },
    totalCount () {
      return this.$store.getters.totalCount
    },
    totalPrice () {
      return this.$store.getters.totalPrice
    },
    inform () {
      if (this.totalPrice === 0) {
        return `¥${this.minPrice}起送`
      } else if (this.totalPrice < this.minPrice) {
        return `还差¥${this.minPrice - this.totalPrice}起送`
      } else {
        return `去结算`
      }
    },
    ...mapGetters([
      'hasGoodList'
    ])
  }
}
</script>
<style lang="stylus" ref="stylesheet/stylus">
@import url("../style.css");
@import url("../reset.css");
@import "../stylus/index.styl";
#shopcart
  width 100%
  position fixed
  left 0
  bottom 0
  height 48px
  z-index 300
  .content
    width 100%
    display flex
    background-color #141e27
    .chart-icon-wrapper
      flex 0 0 80px
      position relative
      .chart-icon
        position relative
        width 44px
        height 44px
        border-radius 44px
        border 6px solid #141e27
        background-color #2b333b
        margin-left 18px
        margin-top -10px
        font-size 24px
        color rgba(255,255,255,0.4)
        text-align center
        line-height 44px
        &.noZChart
          background-color #00a0dc
          color #ffffff
      .total-count
        position absolute
        right 0
        top -6px
        text-align center
        background-color #ff0000
        color #ffffff
        width 24px
        height 16px
        font-size 8px
        font-weight 700
        line-height 16px
        box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        border-radius 16px
    .deliver-fee
      flex 1
      padding 12px 0 12px 12px
      height 24px
      .price
        display inline-block
        line-height 24px
        color rgba(255,255,255,0.2)
        border-1px-right(rgba(255,255,255,0.2))
        padding-right 12px
        &.noZPrice
          color #ffffff
      .deliveryPrice
        display inline-block
        padding-left 12px
        font-size 12px
        line-height 20px
        font-weight 700
        color rgba(255,255,255,0.4)
    .deliver-base
      flex 0 0 105px
      padding 0 8px
      line-height 48px
      font-size 12px
      text-align center
      color rgba(255,255,255,0.1)
      font-weight 700
      background-color #2b333b
      &.ok
        background-color green
        color #ffffff
  .cart-list-wrapper
    position fixed
    top 0
    bottom 48px
    width 100%
    z-index -1
    display flex
    flex-direction column
    .cart-gray
      flex 1
      background-color rgba(7,17,27,0.6)
    .cart-list
      width 100%
      position fixed
      bottom 48px
      left 0px
      background-color #ffffff
      overflow auto
      max-height 217px
      .cart-list-header
        height 40px
        line-height 40px
        padding 0 18px
        border-1px(rgba(7,17,27,0.1))
        background-color #f3f5f7
        .cart-title
          font-size 14px
          font-weight 200
          color rgb(7,17,27)
        .clear
          position absolute
          right 18px
          font-size 12px
          color rgb(0,16,220)
      .cart-food-item
        width 100%
        height 48px
        line-height 48px
        margin 0 18px
        border-1px(rgba)
        .food-name
          color rgb(7,17,27)
          font-size 14px
        .food-price
          position absolute
          right 120px
          font-size 10px
        .cart-control-wrapper
          position absolute
          right 18px
          top 6px
          display inline-block
</style>
