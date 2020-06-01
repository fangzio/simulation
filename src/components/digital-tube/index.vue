<template>
  <div>
    <div :style="{height:cHeight,width:cWidth}" class="container">
      <!-- top -->
      <svg
        :height="segmentWidth"
        :style="getTubePos('l','t')"
        :width="segmentLength"
        v-show="isSegmentShow('t')"
      >
        <path :d="tPath" :fill="fillColor" :stroke="strokeColor" />
      </svg>
      <!-- left top -->
      <svg
        :height="segmentLength"
        :style="getTubePos('l','t')"
        :width="segmentWidth"
        v-show="isSegmentShow('lt')"
      >
        <path :d="ltPath" :fill="fillColor" :stroke="strokeColor" />
      </svg>
      <!-- right top -->
      <svg
        :height="segmentLength"
        :style="getTubePos('r','t')"
        :width="segmentWidth"
        v-show="isSegmentShow('rt')"
      >
        <path :d="rtPath" :fill="fillColor" :stroke="strokeColor" />
      </svg>
      <!-- center -->
      <svg
        :height="segmentWidth"
        :style="getTubePos('l','c')"
        :width="segmentLength"
        v-show="isSegmentShow('c')"
      >
        <path :d="cPath" :fill="fillColor" :stroke="strokeColor" />
      </svg>
      <!-- left bottom -->
      <svg
        :height="segmentLength"
        :style="getTubePos('l','b')"
        :width="segmentWidth"
        v-show="isSegmentShow('lb')"
      >
        <path :d="lbPath" :fill="fillColor" :stroke="strokeColor" />
      </svg>
      <!-- right bottom -->
      <svg
        :height="segmentLength"
        :style="getTubePos('r','b')"
        :width="segmentWidth"
        v-show="isSegmentShow('rb')"
      >
        <path :d="rbPath" :fill="fillColor" :stroke="strokeColor" />
      </svg>
      <!-- bottom -->
      <svg
        :height="segmentWidth"
        :style="getTubePos('l','b')"
        :width="segmentLength"
        v-show="isSegmentShow('b')"
      >
        <path :d="bPath" :fill="fillColor" :stroke="strokeColor" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      width: 200,
      height: 400,
      segmentWidth: 42,
      segmentLength: 200,
      segmentDiff: 42,
      fillColor: '#3399CC',
      strokeColor: '#336699',
      segmentShowList: [],
    }
  },
  props: {
    value: {
      type: Number,
      default: 0,
    },
    //是否有小数点
    hasPoint: {
      type: Boolean,
      default: false,
    }
  },
  watch: {
    value (newValue) {
      this.updateSegementShow(newValue)
    }
  },
  mounted () {
    this.updateSegementShow(this.value)
  },
  methods: {
    //获取数码管位置
    getTubePos (xType, yType) {
      let lr = xType == 'l' ? 'left' : 'right';
      let tb, tbValue
      let pos = {}
      if (yType == 't') {
        tb = 'top'
        tbValue = 0
      }
      if (yType == 'b') {
        tb = 'bottom'
        tbValue = 0
      }
      if (yType == 'c') {
        tb = 'top'
        tbValue = this.segmentLength - this.segmentWidth
      }
      pos[lr] = 0
      pos[tb] = tbValue
      return pos
    },
    isSegmentShow (pos) {
      let indexOf = Array.prototype.indexOf
      return indexOf.call(this.segmentShowList, pos) != -1
    },
    //更新段选
    updateSegementShow (value) {
      this.segmentShowList = this.getSegmentShowMap(value)
    },
    //段选
    getSegmentShowMap (v) {
      const showMap = [
        ['t', 'lt', 'rt', 'lb', 'rb', 'b'],//0
        ['rt', 'rb'],//1
        ['t', 'rt', 'c', 'lb', 'b'],//2
        ['t', 'rt', 'c', 'rb', 'b'],//3
        ['lt', 'c', 'rt', 'rb'],//4
        ['t', 'lt', 'c', 'rb', 'b'],//5
        ['t', 'lt', 'c', 'lb', 'b', 'rb'],//6
        ['t', 'rt', 'rb'],//7
        ['t', 'lt', 'rt', 'c', 'lb', 'rb', 'b'],//8
        ['t', 'lt', 'rt', 'c', 'rb', 'b'],//9
      ];
      v = parseInt(v)
      let hasKey = Object.hasOwnProperty
      if (hasKey.call(showMap, v)) {
        return showMap[v]
      }
      return []
    }
  },
  computed: {
    cHeight () {
      return this.height - this.segmentWidth + 'px';
    },
    cWidth () {
      return this.width + 'px';
    },
    tPath () {
      let length = this.segmentLength
      let width = this.segmentWidth
      let diff = this.segmentDiff
      return `M 0 0 L ${length} 0 l -${diff} ${width} L ${diff} ${width} z`
    },
    ltPath () {
      let length = this.segmentLength
      let width = this.segmentWidth
      let diff = this.segmentDiff
      return `M 0 0 L ${width} ${diff} l 0 ${length - 2 * diff} l -${width / 2} ${diff / 2}
      l -${width / 2} -${diff / 2} z`
    },
    rtPath () {
      let length = this.segmentLength
      let width = this.segmentWidth
      let diff = this.segmentDiff
      return `M ${width} 0 l 0 ${length - diff} l -${width / 2} ${diff / 2} l -${width / 2} -${diff / 2}
      l 0 -${length - diff * 2} z`
    },
    cPath () {
      let length = this.segmentLength
      let width = this.segmentWidth
      let diff = this.segmentDiff
      return `M ${diff / 2} ${width / 2} l ${diff / 2} -${width / 2} l ${length - diff * 2} 0 
      l ${diff / 2} ${width / 2} l -${diff / 2} ${width / 2} l -${length - diff * 2} 0 z`
    },
    lbPath () {
      let length = this.segmentLength
      let width = this.segmentWidth
      let diff = this.segmentDiff
      return `M 0 ${length} l ${width} -${diff} l 0 -${length - 2 * diff} l -${width / 2} -${diff / 2}
      l -${width / 2} ${diff / 2} z`
    },
    rbPath () {
      let length = this.segmentLength
      let width = this.segmentWidth
      let diff = this.segmentDiff
      return `M ${width} ${length} l -${width} -${diff} l 0 -${length - 2 * diff} l ${width / 2} -${diff / 2}
      l ${width / 2} ${diff / 2} z`
    },
    bPath () {
      let length = this.segmentLength
      let width = this.segmentWidth
      let diff = this.segmentDiff
      return `M 0 ${width} l ${diff} -${width} l${length - 2 * diff} 0 l ${diff} ${width} z`
    },
  }
}
</script>

<style scoped>
.container {
  background-color: #ccc;
  position: relative;
}
.bottom {
  width: 200px;
  height: 50px;
  background-color: #3399cc;
}
svg {
  position: absolute;
}
</style>