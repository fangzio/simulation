<template>
  <div id="app">
    <digital-tube :value="value"></digital-tube>
  </div>
</template>

<script>

import DigitalTube from '@/components/digital-tube'

export default {
  name: 'App',
  components: {
    DigitalTube
  },
  data () {
    return {
      value: 0,
    }
  },
  mounted () {
    //更新数码管的值
    setInterval(() => {
      this.value = (++this.value) % 10
    }, 1000)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
