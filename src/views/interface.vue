<template >
  <div
    class="box" 
    :class="{'full-screen': fullScreen}" 
    v-show="this.$store.state.show" 
    v-if="this.$store.state.isOpen"
    @click.right.stop.prevent=""
  >
    <div class="operation" v-drag:[perm]="fullScreen">
      <div class="btnbox" >

        <button class="min btn" @click="handleMin">
          <img src="@/assets/img/min.svg">
        </button>
        <button class="max btn" ref="btn" @click="toggleFullScreen">
          <img src="@/assets/img/max.svg">
        </button>
        <button class="close btn" @click="handleClose">
          <img src="@/assets/img/close.svg">
        </button>

      </div>
    </div>
    <div class="content">
      <!-- 此处插入router-view ，div仅作示范-->
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: "interface",
  data () {
    return {
      fullScreen: false,
      perm: undefined
    };
  },

  created() {
    this.setTemp
    console.log(this.$route)
  },

  methods: {
    setTemp() {
      this.$store.commit('SET_TEMP', this.$route.path)
    },

    handleMin() {
      this.$store.commit('CHANGE_SHOW')
    },

    toggleFullScreen() {
      let box = this.$refs.btn.parentNode.parentNode.parentNode
      box.style.left = 0
      box.style.top = 0
      this.fullScreen = !this.fullScreen
      console.log(this.fullScreen)
    },

    handleClose() {
      this.$store.commit('CLOSE_APP')
      this.$store.commit('OPEN_APP')
      this.$store.commit('DELETE_QUEST', this.$route)
      this.$router.push('/')

    },
  },
  directives: {
    drag: {
      mounted(el,binding) {
        let box = el.parentNode;
        let isDrag = false;
        el.onmousedown = function(e) {
          const disx = e.pageX - el.offsetLeft - box.offsetLeft;
          const disy = e.pageY - el.offsetTop - box.offsetTop;
          isDrag = true;
          el.onmousemove = function(e) {
            if(isDrag && !binding.value) {
              box.style.left = `${e.pageX - disx}px`
            box.style.top = `${e.pageY - disy}px` 
            }
          } 
          el.onmouseup = function() {
            isDrag = false
          }
        }
      },
      updated(el, binding) {
        let box = el.parentNode;
        let isDrag = false;
        el.onmousedown = function(e) {
          const disx = e.pageX - el.offsetLeft - box.offsetLeft;
          const disy = e.pageY - el.offsetTop - box.offsetTop;
          isDrag = true;
          el.onmousemove = function(e) {
            if(isDrag && !binding.value) {
              box.style.left = `${e.pageX - disx}px`
            box.style.top = `${e.pageY - disy}px` 
            }
          } 
          el.onmouseup = function() {
            isDrag = false
          }
        }
      },
    }
  }
}
</script>

<style scoped>
  .box {
    background-color: blanchedalmond;
    position: absolute;
    margin:0;
    border: blueviolet solid 5px;
    border-top-width: 0;
    border-radius: 5px;
  }

  .full-screen {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: white;
    z-index: 9;
    height: 99.3%!important;
    width: 99.3%;
  } 

  .box .operation {
    position: relative;
    width: 100%;
    height: 40px;
    background-color: blueviolet;
  }
  .box .operation .btnbox {
    position: absolute;
    right: 0;
  }
  .box .content {
    width: 100%;
    height: 94%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .btn {
    border: 0 none;
    margin-left: 1px;
    background-color: cadetblue;
    border-radius: 0 0 3px 3px;
    outline: none;
    transition: background-color 0.5s;
  }
  .btn:hover {
    background-color: cornflowerblue;
  }
  .close {
    background-color: red;
    transition: background-color 0.5s;
  }
  .close:hover {
    background-color: rgb(255, 80, 0);
  }
</style>