<template>
  <div id="cart-control">
    <span class="decrease icon-remove_circle_outline" v-show="count" @click="removeFood"></span>
    <span class="count" v-show="count">{{count}}</span>
    <span class="increase icon-add_circle" @click="addFood"></span>
  </div>
</template>
<script>
export default {
  name: 'cartControl',
  props: {
    food: {
      type: Object
    }
  },
  computed: {
    count () {
      return this.$store.getters.findGoodCount({name: this.food.name, price: this.food.price})
    }
  },
  methods: {
    addFood () {
      this.$store.commit('push', {
        name: this.food.name,
        price: this.food.price
      })
    },
    removeFood () {
      this.$store.commit('pop', {
        name: this.food.name,
        price: this.food.price
      })
    }
  }
}
</script>
<style lang="stylus" ref="stylesheet/stylus">
@import url("../style.css");
@import url("../reset.css");
@import "../stylus/index.styl";
#cart-control
  display inline-block
  font-size 0
  .decrease, .increase
    display inline-block
    font-size 24px
    width 24px
    line-height 24px
    height 24px
    color #00a0dc
    padding 6px
  .count
    display inline-block
    display inline-block
    text-align center
    width 12px
    height 36px
    font-size 12px
    font-weight 200
    color rgb(147,153,159)
    line-height 36px
    vertical-align top
</style>
