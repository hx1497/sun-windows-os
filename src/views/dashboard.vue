<template>
  <div class="dashboard">
    <!-- 主要显示区 -->
    <div 
      class="main"
      @click="closeStart" 
      @click.right="showMenu($event)"
      @contextmenu.prevent=""
    >
      <RightMenu
        v-show="$store.state.isMenuShow"></RightMenu>
      <ul class="applist" >
        <li v-for="app in appList" :key="app.meta.title">
          <div class="item" @click="openApp(app.path,app)" @click.right.stop.prevent="">
            <img :src="require(`@/assets/img/${app.meta.icon}.svg`)" style="width: 50px; height: 50px;">
          </div>
        </li>
      </ul>
      <router-view style="position: absolute;" />
    </div>
    <!-- footer -->
    <div class="bottom-bar" @contextmenu.prevent="">
      <!-- 开始按钮 -->
      <div class="window">
        <Start></Start>
      </div>
     <!-- 任务栏 -->
      <div class="quest">
        <Quest></Quest>
      </div>
       <!-- 网络连接、时间等状态 -->
      <div class="info">
        <Info></Info>
      </div>
    </div>
  </div>
</template>

<script>
import Start from '@/components/start.vue'
import Info from '@/components/info.vue'
import Quest from '@/components/quest.vue'
import RightMenu from '@/components/menu.vue'

export default {
  name: 'dashboard',
  components: {
    Start,
    Info,
    Quest,
    RightMenu
  },
  data() {
    return {
      appList: [],
    }
  },
  created() {
    this.getList()
  },

  methods: {
    getList() {
      this.appList = this.$store.state.routelist
    },
    showMenu(e) {
      this.$store.commit('SHOW_MENU')
      console.log(e.offsetX, e.offsetY)
      this.$store.state.MenuX = e.offsetX
      this.$store.state.MenuY = e.offsetY
      if(this.$store.state.showStart) {
        this.$store.commit('SET_START')
      }
    },
    closeStart() {
      if(this.$store.state.showStart)
      this.$store.commit('SET_START')
      this.$store.commit('CLOSE_MENU')
    },
    openApp(path,route) {
      this.$store.commit('OPEN_APP')
      if(this.$store.state.show === false) {
        this.$store.commit('CHANGE_SHOW')
      }
      //console.log('route',route)
      this.$store.commit('ADD_QUEST', route)
      this.$store.commit('SET_TEMP', path)
      console.log(path)
      this.$router.push(path)
      this.isShow = !this.isShow
      //console.log(path)
    },
  },
}
</script>

<style scoped>
  .dashboard {
    height: 100%;
  }
  .dashboard .main {
    box-sizing: border-box;
    position: relative;
    height: 94%;
    background-image: url('../assets/img/Wallpaper.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .dashboard .main .applist {
    position: absolute;
    box-sizing: border-box;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin: 0;
    list-style: none;
    padding: 10px;
  }

  .applist li .item {
    box-sizing: border-box;
    border-radius: 5px;
    padding: 5px;
    height: 60px;
    width: 60px;
    margin: 10px;
  }

  .applist li .item:hover {
    cursor: pointer;
    background-image: linear-gradient(rgb(192, 192, 192, 0.6), rgb(128, 128, 128, 0.6));
  }

   .bottom-bar {
   height: 6%;
   box-sizing: border-box;
   display: flex;
   align-items: center;
   background-color: black;
  }

  .bottom-bar .window {
    height: 100%;
    width: 5%;

  }

  .bottom-bar .quest {
    height: 100%;
    width: 85%;

  }

  .bottom-bar .info {
    width: 10%;
    height: 100%;
  }
</style>>


