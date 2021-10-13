<template>
<div style="height: 100%; width: 100%">
  <div class="startbtn" style="padding-left: 5px; width: 100%; height:100% " @click="showClick">
  </div>
  <div class="show" v-show="isShow">
    <ul class="app" >
      <li v-for="item in routeList" :key="item.meta.title">
        <div class="item" @click="open(item.path,item)">
          <img :src="require(`@/assets/img/${item.meta.icon}.svg`)" style="width: 50px; height: 50px; padding: 5px">
          <span style="padding-left: 5px; line-height: 50px"> {{item.meta.title}} </span>
        </div>
      </li>
    </ul>
    <div class="sysapp">
      <div class="close" @click="logout">
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {

  name: "start",

  data () {
    return {
      isShow: undefined, 
      routeList: []
    };
  },

  created() {
    this.getList()
  },

  watch: {
    "$store.state.showStart"(newVal) {
      this.isShow = newVal
    }
  },

  methods: {
    showClick() {
      this.$store.commit('SET_START')
    },

    open(path,route) {

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

    getList() {
      this.routeList = this.$store.state.routelist
      console.log('start route:',this.$store.state.routelist)
    },

    logout() {
      localStorage.removeItem('token')
      location.reload()
    }
  },
}
</script>


<style scoped>
  .startbtn {
    background-image: url('../assets/img/windows.png');
    background-repeat: no-repeat;
    background-position-y: center;
    background-position-x: 15%;
    box-sizing: border-box;
    border-right: cornflowerblue 1px solid;
    transition: background-color 1s;
  }
  .startbtn:hover {
    background-color: rgb(89, 113, 122);
  }
  .show {
    position: absolute;
    display: flex;
    background-color:rgb(0, 0, 0,0.8);
    height: 55%;
    width: 300px;
    box-sizing: border-box;
    padding: 10px 10px 3px 10px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    bottom: 6%;
    left: 0;
  }
  .show .app {
    box-sizing: border-box;
    border-radius: 5px;
    margin: 0 3px 0 0;
    padding-left: 2px;
    width: 180px;
    height: 100%;
    list-style-type: none;
    background-color: #fff;
    overflow-y: scroll;
  }
  .show .app li {
    display: flex;
    padding: 2px 0;
    background-color: snow;
    border: snow solid 1px;
    border-radius: 5px;
  }

  .show .app li:hover {
    cursor: pointer;
    background-image: linear-gradient(rgb(230,230,230),silver);
    border: rgb(151, 141, 141) solid 1px;
  }
  
  .show .app li .item {
    display: flex;
  }

  .show .sysapp {
    height: 100%;
    width: 100px;
    position: relative;
    box-sizing: border-box;
  }

  .show .sysapp .close {
    height: 80px;
    width: 50px;
    position: absolute;
    border-radius: 5px;
    background-image: url('../assets/img/shutdown.svg');
    background-repeat: no-repeat;
    background-position: center center;
    background-color: red;
    transition: background-color 0.5s;
    bottom: 0; 
  }
  .show .sysapp .close:hover {
    cursor: pointer;
    background-color: rgb(255, 80, 0);
  }
</style>