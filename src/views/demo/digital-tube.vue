<template>
  <div>
    <digital-tube
      :height="200"
      :segmentDiff="21"
      :segmentLength="100"
      :segmentWidth="21"
      :value="value"
      :width="100"
      class="inline-block"
    ></digital-tube>
    <digital-tube
      :height="200"
      :segmentDiff="21"
      :segmentLength="100"
      :segmentWidth="21"
      :value="value+1"
      :width="100"
      class="inline-block"
    ></digital-tube>
  </div>
</template>

<script>
import DigitalTube from '@/components/digital-tube'
export default {
  components: {
    DigitalTube
  },
  data () {
    return {
      value: 0,
    }
  },
  mounted () {
    return
    //更新数码管的值
    // setInterval(() => {
    //   this.value = (++this.value) % 10
    // }, 1000)
  }
}
</script>
<style scoped>
.inline-block {
  display: inline-block;
}
</style>