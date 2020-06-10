<template>
  <div :style="svgStyle">
    <svg :style="svgStyle">
      <path :d="pathString" :stroke="trailColor" :stroke-width="trailWidth" :fill-opacity="0" />
      <path
        :d="pathString"
        stroke-linecap="round"
        :stroke="strokeColor"
        :stroke-width="strokeWidth"
        fill-opacity="0"
        :style="pathStyle"
      />
        <path
          :d="innerPathString"
          stroke-linecap="round"
          :stroke="strokeColor"
          :stroke-width="trailWidth"
          fill-opacity="0"
          :style="innerPathStyle"
        />
    </svg>
    <div class="vux-circle-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "processCircle",
  props: {
    strokeWidth: {
      //线条宽度
      type: Number,
      default: 1
    },
    strokeColor: {
      //线条颜色
      type: String,
      default: "#3FC7FA"
    },
    trailWidth: {
      //背景线条宽度
      type: Number,
      default: 1
    },
    trailColor: {
      //背景线条宽度
      type: String,
      default: "#D9D9D9"
    },
    percent: {
      //进度百分比
      type: Number,
      default: 0
    },
    rd: {
      //圆大小半径
      type: Number,
      default: 50
    }
  },
  computed: {
    svgStyle() {
      return {
        width: `${2 * this.rd}px`,
        height: `${2 * this.rd}px`,
        position: "relative"
      };
    },
    radius() {
      //外圆圆半径
      return this.rd - this.strokeWidth / 2;
    },
    pathString() {
      return `M ${this.rd},${this.rd} m 0, -${this.radius}
        a ${this.radius},${this.radius} 0 1 1 0,${2 * this.radius}
        a ${this.radius},${this.radius} 0 1 1 0, -${2 * this.radius}`;
    },
    len() {
      return Math.PI * 2 * this.radius;
    },
    pathStyle() {
      return {
        "stroke-dasharray": `${this.len}px ${this.len}px`,
        "stroke-dashoffset": `${((100 - this.percent) / 100) * this.len}px`, //动画占圆周长百分比
        transition: "stroke-dashoffset 1s ease" //2s代表动画时间
      };
    },
    innerRadius(){
      return (this.rd * 0.83) - this.strokeWidth / 2;
    },
    innerPathString(){
      return `M ${this.rd },${this.rd } m 0,-${this.innerRadius}
        a ${this.innerRadius},${this.innerRadius} 0 1 1 0,${2 * this.innerRadius}
        a ${this.innerRadius},${this.innerRadius} 0 1 1 0,-${2 * this.innerRadius}`;
    },
    innerLen() {
      return Math.PI * 2 * this.innerRadius;
    },
    innerPathStyle() {
      return {
        "stroke-dasharray": `${this.innerLen}px ${this.innerLen}px`,
        "stroke-dashoffset": `${((100 - this.percent) / 100) * this.innerLen}px`, //动画占圆周长百分比
        transition: "stroke-dashoffset 1s ease" //2s代表动画时间
      };
    }
  }
};
</script>

<style >
.vux-circle-content {
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>