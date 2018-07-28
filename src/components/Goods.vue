<template>
  <div id="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <div v-for="(item, index) in goods" :key="index" class="menu-item" :class="{current: currentIndex === index}" @click="selectIndex(index, $event)">
        <div class="text-wrapper border-1px">
          <span class="icon" v-show="item.type > 0" :class="classMap[item.type]"></span>
          <span class="text">{{item.name}}</span>
        </div>
      </div>
    </div>
    <div class="foods-wrapper" ref="foodWrapper">
      <ul>
        <li v-for="(item, index) in goods" :key="index" class="foods-list">
          <div class="itmes-title">
            {{item.name}}
          </div>
          <ul>
            <li v-for="(food, index) in item.foods" :key="index" class="items-content-wrapper">
              <div class="item-img">
                <img :src="food.icon" alt="">
              </div>
              <div class="item-content border-1px">
                <div class="item-name">{{food.name}}</div>
                <div v-if="food.description" class="item-description">{{food.description}}</div>
                <div class="Situation">
                  <span sellSituation>月售{{food.sellCount}}</span>
                  <span class="ratingSituation">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="nowPrice">{{food.price}}</span>
                  <del class="oldPrice" v-if="food.oldPrice">¥{{food.oldPrice}}</del>
                </div>
              </div>
              <div class="cart-control-wrapper">
                <my-cartcontrol :food="food"></my-cartcontrol>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <my-shopcart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></my-shopcart>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import BScroll from 'better-scroll'
import Shopcart from './Shopcart'
import CartControl from './CartControl'
export default {
  name: 'goods',
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: [],
      heightList: [],
      scrollY: 0
    }
  },
  methods: {
    selectIndex (index, $event) {
      if (!$event._constructed) {
        return
      }
      let foodList = this.$refs.foodWrapper.getElementsByClassName(
        'foods-list'
      )
      this.foodScroll.scrollToElement(foodList[index], 300)
    },
    _initscroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodScroll = new BScroll(this.$refs.foodWrapper, {
        probeType: 3,
        click: true
      })
      this.foodScroll.on('scroll', pos => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _caculateHeight () {
      let foodList = this.$refs.foodWrapper.getElementsByClassName('foods-list')
      let height = 0
      this.heightList.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.heightList.push(height)
      }
    }
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.heightList.length; i++) {
        let height1 = this.heightList[i]
        let height2 = this.heightList[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    },
    selectFoods () {
      let foods = []
      if (this.goods.length !== 0) {
        this.goods.forEach(good => {
          good.foods.forEach(food => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
      }
      return foods
    }
  },
  components: {
    'my-shopcart': Shopcart,
    'my-cartcontrol': CartControl
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    var that = this
    axios.get('/good/goods').then(res => {
      if (res.data.code === 0) {
        this.goods = res.data.data
        Vue.nextTick(() => {
          that._initscroll()
          that._caculateHeight()
        })
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" ref="stylesheet/stylus">
@import url("../style.css");
@import url("../reset.css");
@import "../stylus/index.styl";
  #goods
    display flex
    position absolute
    top 174px
    bottom 48px
    left 0px
    right 0px
    width 100%
    overflow hidden
    .menu-wrapper
      display 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        padding 0 12px
        font-size 0
        line-height 16px
        &.current
          position relative
          background-color #ffffff
          margin-top -1px
          &:after
            border-top 1px solid #ffffff
          .text
            font-size 12px
            line-height 14px
            font-weight 500
        .text
          font-size 12px
          line-height 14px
          font-weight 200
        .text-wrapper
          display table-cell
          vertical-align middle
          height 54px
          width 54px
          border-1px(rgba(7,17,27,0.1))
          .icon
            display inline-block
            vertical-align top
            width 14px
            height 14px
            background-size 14px 14px
            &.decrease
              bg-image('decrease_3')
            &.discount
              bg-image('discount_3')
            &.guarantee
              bg-image('guarantee_3')
            &.invoice
              bg-image('invoice_3')
            &.special
              bg-image('special_3')
    .foods-wrapper
      flex 1
      background #ffffff
      .itmes-title
        height 26px
        line-height 26px
        padding-left 14px
        font-size 12px
        font-weight 400
        color rgb(147,153,159)
        background-color #f3f5f7
        border-left 4px solid #d9dde1
      .items-content-wrapper
        border-1px(rgba(7,17,27,0.1))
        display flex
        margin 18px
        padding-bottom 18px
        position relative
        background #ffffff
        &:last-child
          border-1px(rgb(255,255,255))
        .item-img
          flex 0 0 57px
          img
            width 57px
            height 57px
        .cart-control-wrapper
          position absolute
          right 0
          bottom 8px
        .item-content
          flex 1
          padding-left 10px
          .item-name
            font-size 14px
            color rgb(7,17,27)
            line-height 14px
            margin-top 2px
          .item-description
            margin-top 8px
            font-size 10px
            color rgb(147,153,159)
            line-height 16px
          .Situation
            display inline-block
            margin-top 8px
            font-size 10px
            color rgb(147,153,159)
            line-height 16px
            .ratingSituation
              margin-left 8px
          .price
            margin-top 8px
            font-size 16px
            font-weight 700
            color rgb(240,0,0)
            .oldPrice
              margin-left 8px
              vertical-align top
              font-size 10px
              color rgb(147,153,159)
              line-height 20px

</style>
