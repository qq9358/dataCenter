<template>
  <div>
    <br />
    <div style="display:flex;flex-direction:row;justify-content: space-between;">
      <process-circle
        :strokeWidth="strokeWidth"
        :strokeColor="strokeColor"
        :trailWidth="trailWidth"
        :trailColor="trailColor"
        :percent="percent"
        :rd="68"
      >
      <div>覆盖率</div>
      {{percent}}%
      </process-circle>
      <process-circle
        :strokeWidth="strokeWidth"
        :strokeColor="strokeColor"
        :trailWidth="trailWidth"
        :trailColor="trailColor"
        :percent="percent2"
      >收益90万元</process-circle>
      <process-circle
        :strokeWidth="strokeWidth"
        :strokeColor="strokeColor"
        :trailWidth="trailWidth"
        :trailColor="trailColor"
        :percent="percent3"
      >hello World</process-circle>
    </div>
  </div>
</template>

<script>
import processCircle from "@/components/Circle.vue"; //环形进度条
export default {
  name: "ceCircle",
  components: {
    //注册组件
    processCircle
  },
  data() {
    return {
      strokeWidth: 10, //线条宽度
      strokeColor: "pink", //线条颜色
      trailWidth: 4, //背景线条宽度
      trailColor: "#d9d9d9", //背景线条宽度
      percent: 0, //默认情况下是0
      percent2: 0,
      percent3: 0
    };
  },
  mounted() {
    var that = this;
    setTimeout(() => {
      that.percent = 30;
      that.percent2 = 50;
      that.percent3 = 80;
    }, 100);
  }
};
</script>

