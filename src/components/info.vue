<template>
  <div style="height: 100%; width: 99%; display: flex">
    <div class="wifi"></div>
    <div class="date">
      <span>{{time.hms}}</span>
      <span> {{time.ymd}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "info",
  data () {
    return {
      time: {
        ymd: null, // year-month-day
        hms: null  // hour-minutes
      }
    };
  },
  mounted() {
    this.timer = setInterval(this.getTime,1000)
  },
  beforeUnmount() {
    clearInterval(this.timer)
  },
  methods: {
    getTime() {
      var date = new Date
      let year = date.getFullYear()
      let month = date.getMonth() + 1<10? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
      let hMs = hours + ': ' + minutes
      this.time.ymd = year + '/' + month + '/' + day;
      this.time.hms = hMs
    },
  },
}
</script>

<style scoped>
  .wifi {
    background-image: url('../assets/img/wifi.svg');
    background-repeat: no-repeat;
    background-position-x: center;
    width: 20%;
    padding-left: 5px;
    height: 100%;
  }
  .date {
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .date span {
    display: block;
    height: 40%;
    color: blanchedalmond;
  }
</style>