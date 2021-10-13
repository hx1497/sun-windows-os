<template >
  <ul class="menu" :style="`left: ${$store.state.MenuX}px; top: ${$store.state.MenuY}px`">
    <li class="menu-item end" @click="refresh">
      <span style="line-height: 25px; font-size: 15px;">刷新</span>
    </li>
  </ul>
</template>
<script>
export default {
  name: "rightMenu",
  data () {
    return {
    };
  },
  methods: {
    refresh() {
      location.reload()
    }
  },
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}

.menu {
  width: 100px;
  background-color: #fff;
  list-style: none;
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
  box-shadow: 2px 2px 2px #888888;
  position: absolute;
  z-index: 2;
}
.menu .menu-item {
  height: 25px;
  padding: 2px;
}
.menu .menu-item:hover{
  cursor: pointer;
  background-color: rgb(230, 230, 230);
}

</style>