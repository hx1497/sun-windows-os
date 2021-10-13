<template>
<div class="quest-bar">
  <ul class="list">
    <li v-for="item in showList" :key="item.meta.title" @click="changeShow(item)">
      <img :src="require(`@/assets/img/${item.meta.icon}.svg`)">
    </li>
  </ul>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "quest",
  data () {
    return {
      temp: undefined
    };
  },

  computed: {
    ...mapState({
      showList: 'questList',
    })
  },
  watch: {
    // 解决在start中切换应用时temp无值导致的 changeShow 中跳过 if 判断
    "$store.state.temp"(newVal) {
      this.temp = newVal
    }
  },

  created() {
  },

  methods: {
    changeShow(item) {

      if(item.path === this.temp || this.temp === undefined ) {
        this.$store.commit('CHANGE_SHOW')
      } else {
        this.$router.push(item.path)
        if(this.$store.state.show === false) {
          this.$store.commit('CHANGE_SHOW')
        }
      }
      this.temp = item.path
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
  .quest-bar {
    width: 100%;
    height: 100%;
  }

  .quest-bar .list {
    list-style: none;
    height: 100%;
  }

  .quest-bar .list li {
    display: inline-block;
    box-sizing: border-box;
    padding: 2px;
    margin: 0 2px;
    height: 100%;
    width: 5%;
    transition: background-color 0.5s;
  }

  .quest-bar .list li:hover {
    background-color: rgb(100, 100, 100);
    cursor: pointer;
  }

  .quest-bar .list li img {
    height: 100%;
    width: 100%
  }
</style>