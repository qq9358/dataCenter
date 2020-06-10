<template>
  <div class="div-home">
    <div class="home-top"></div>
    <div class="home-middle">
      <div class="middle-left">
        <div class="div-flow">
          <div class="flow-div flow-real">
            <div v-for="(num,realIndex) in realNum" :key="realIndex" class="flow-num">{{num}}</div>
          </div>
          <div class="flow-div flow-today">
            <div v-for="(num,realIndex) in todayNum" :key="realIndex" class="flow-num">{{num}}</div>
          </div>
        </div>
        <div class="div-sale">
          <div class="sale-channel">
            <ve-ring :data="channelData" :extend="channelExtend" width="400px" height="330px"></ve-ring>
          </div>
          <div class="sale-num">
            <div class="num-div num-today">¥{{todaySale}}</div>
            <div class="num-div num-yester">¥{{yesterSale}}</div>
            <div class="num-div num-month">¥{{monthSale}}</div>
          </div>
        </div>
      </div>
      <div class="middle-center">
        <div class="div-bar">
          <ve-bar
            :data="barData"
            :settings="barSettings"
            :extend="barExtend"
            height="300px"
            width="400px"
            :legend-visible="false"
          ></ve-bar>
        </div>
        <div class="div-heatmap">
          <ve-heatmap
            :data="heatmapData"
            :settings="heatmapSettings"
            :legend-visible="false"
            :tooltip-visible="false"
            :extend="heatmapExtend"
            height="650px"
            width="650px"
          ></ve-heatmap>
        </div>
      </div>
      <div class="middle-right">
        <div class="div-weather">
          <div class="weather-div">
            <div v-for="weather in weathers" :key="weather.date" class="day-weather">
              <div class="month-day">{{weather.monthDay}}</div>
              <div class="day-name">（{{weather.dayName}}）</div>
              <div :class="weather.iconClass"></div>
              <div class="div-wea">{{weather.wea}}</div>
              <div class="div-temperature">{{weather.tem1}}/{{weather.tem2}}</div>
            </div>
          </div>
          <div class="hour-div">
            <ve-line
              :data="hoursData"
              width="590px"
              height="200px"
              :settings="hoursSettings"
              :legend-visible="false"
              :extend="hoursExtend"
            ></ve-line>
          </div>
        </div>
        <div class="div-trend">
          <div class="trend-sale">
            <ve-line :data="saleTrendData" width="510px" height="205px" :extend="saleTrendExtend"></ve-line>
          </div>
          <div class="trend-check">
            <ve-line :data="checkTrendData" width="510px" height="205px" :extend="checkTrendExtend"></ve-line>
          </div>
        </div>
      </div>
    </div>
    <div class="home-bottom">
      <div class="bottom-left">
        <div class="div-sex">
          <div class="sex-ratio">
            <div class="ratio-male">
              <process-circle
                :strokeWidth="maleParams.strokeWidth"
                :strokeColor="maleParams.strokeColor"
                :trailWidth="maleParams.trailWidth"
                :trailColor="maleParams.trailColor"
                :percent="maleParams.percent"
                :rd="68"
              >
                <div class="circle-div">
                  <div class="circle-icon">
                    <div class="iconfont icon-male"></div>
                  </div>
                  <div class="circle-percent">
                    <div class="percent-title">覆盖率</div>
                    <div class="percent-value">{{maleParams.percent}}%</div>
                  </div>
                </div>
              </process-circle>
            </div>
            <div class="ratio-female">
              <process-circle
                :strokeWidth="femaleParams.strokeWidth"
                :strokeColor="femaleParams.strokeColor"
                :trailWidth="femaleParams.trailWidth"
                :trailColor="femaleParams.trailColor"
                :percent="femaleParams.percent"
                :rd="68"
              >
                <div class="circle-div">
                  <div class="circle-icon">
                    <div class="iconfont icon-female"></div>
                  </div>
                  <div class="circle-percent">
                    <div class="percent-title">覆盖率</div>
                    <div class="percent-value">{{femaleParams.percent}}%</div>
                  </div>
                </div>
              </process-circle>
            </div>
          </div>
          <div class="sex-num">
            <div class="num-div num-male">{{maleNum}}</div>
            <div class="num-div num-female">{{femaleNum}}</div>
          </div>
        </div>
        <div class="div-age">
          <ve-ring :data="ageData" :extend="ageExtend" width="500px" height="350px"></ve-ring>
        </div>
      </div>
      <div class="bottom-right">
        <div class="check-in">
          <ve-line :data="checkInData" width="790px" height="330px" :settings="checkInSettings" :extend="checkInExtend"></ve-line>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import weather from "@/utils/weather.js";
import processCircle from "@/components/Circle.vue";

export default {
  name: "Home",
  components: {
    processCircle
  },
  data() {
    return {
      realNum: "0012345",
      todayNum: "0123456",
      todaySale: 1234.56,
      yesterSale: 2345.67,
      monthSale: 34567.89,
      weathers: [],
      hoursData: {
        columns: ["win", "tem"],
        rows: [
          { win: "西南风1级", tem: "21" },
          { win: "西南风2级", tem: "22" },
          { win: "西南风3级", tem: "33" },
          { win: "西南风4级", tem: "24" },
          { win: "西南风5级", tem: "25" },
          { win: "西南风6级", tem: "36" },
          { win: "西南风7级", tem: "27" },
          { win: "西南风8级", tem: "28" }
        ]
      },
      hoursSettings: {
        legendName: ""
      },
      hoursExtend: {
        yAxis: {
          show: false,
          axisLine: {
            show: false
          }
        },
        xAxis: {
          show: false
        },
        series: {
          label: {
            show: true,
            formatter: function(params) {
              return params.data[1] + "℃";
            },
            color: "#de5420"
          },
          lineStyle: {
            color: "#de5420"
          },
          itemStyle: {
            color: "#de5420"
          }
        }
      },
      maleNum: 1214,
      femaleNum: 1221,
      heatmapData: {
        columns: ["lat", "lng", "人数"],
        rows: [
          { lat: 115.892151, lng: 28.676493, 人数: 1000 },
          { lat: 117.000923, lng: 36.675807, 人数: 400 },
          { lat: 113.665412, lng: 34.757975, 人数: 800 },
          { lat: 114.298572, lng: 30.584355, 人数: 200 },
          { lat: 112.982279, lng: 28.19409, 人数: 100 },
          { lat: 113.280637, lng: 23.125178, 人数: 300 },
          { lat: 110.33119, lng: 20.031971, 人数: 800 },
          { lat: 104.065735, lng: 30.659462, 人数: 700 },
          { lat: 108.948024, lng: 34.263161, 人数: 300 },
          { lat: 103.823557, lng: 36.058039, 人数: 500 }
        ]
      },
      heatmapSettings: {
        position: "china",
        type: "map",
        geo: {
          label: {
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              areaColor: "#323c48",
              borderColor: "#628d4c"
            },
            emphasis: {
              areaColor: "#2a333d"
            }
          }
        }
      },
      heatmapExtend: {
        visualMap: {
          show: false
        }
      },
      barData: {
        columns: ["城市", "人数"],
        rows: [
          { 城市: "深圳", 人数: 593 },
          { 城市: "广州", 人数: 700 },
          { 城市: "上海", 人数: 893 },
          { 城市: "北京", 人数: 993 },
          { 城市: "杭州", 人数: 1093 }
        ]
      },
      barSettings: {
        dimension: ["城市"],
        metrics: ["人数"]
      },
      barExtend: {
        series: {
          barMaxWidth: 12,
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: "#104a9c" // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#42eb84" // 100% 处的颜色
                }
              ],
              globalCoord: false // 缺省为 false
            }
          },
          label: {
            show: true,
            position: "right",
            color: "#65eab9"
          }
        },
        xAxis: {
          show: false
        },
        yAxis: {
          data: [
            {
              value: "杭州",
              textStyle: {
                color: "#4f73a0"
              }
            },
            {
              value: "广州",
              textStyle: {
                color: "#4f73a0"
              }
            },
            {
              value: "上海",
              textStyle: {
                color: "#4f73a0"
              }
            },
            {
              value: "北京",
              textStyle: {
                color: "#4f73a0"
              }
            },
            {
              value: "深圳",
              textStyle: {
                color: "#4f73a0"
              }
            }
          ],
          axixLine: {
            lineStyle: {
              color: "#0f0"
            }
          }
        }
      },
      channelData: {
        columns: ["channel", "money"],
        rows: [
          { channel: "微信", money: "1234.56" },
          { channel: "官网", money: "2234.56" },
          { channel: "自助机", money: "3234.56" },
          { channel: "分销", money: "4234.56" },
          { channel: "窗口", money: "5234.56" }
        ]
      },
      channelExtend: {
        tooltip: {},
        legend: {
          right: 0,
          top: 130,
          orient: "vertical",
          textStyle: {
            color: "#628ec0"
          }
        },
        series: {
          radius: [58, "43"],
          label: {
            formatter: function(params) {
              return params.percent + "%";
            },
            textStyle: {
              color: "#fff"
            }
          }
        }
      },
      saleTrendData: {},
      saleTrendExtend: {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
            "24",
            "25",
            "26",
            "27",
            "28",
            "29",
            "30"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [
              820,
              932,
              901,
              934,
              1290,
              1330,
              1320,
              932,
              901,
              934,
              1290,
              1330,
              1320,
              932,
              901,
              934,
              1290,
              1330,
              1320,
              932,
              901,
              934,
              1290,
              1330,
              1320,
              932,
              901,
              934,
              1290,
              1330
            ],
            type: "line",
            areaStyle: {
              color: {
                type: "linear",
                x: 0, //右
                y: 0, //下
                x2: 0, //左
                y2: 1, //上
                colorStops: [
                  {
                    offset: 0,
                    color: "#01213a" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#016c8d" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            },
            itemStyle: {
              color: "#00fffc"
            },
            lineStyle: {
              color: "#00fffc"
            }
          }
        ]
      },
      checkTrendData: {},
      checkTrendExtend: {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
            "24",
            "25",
            "26",
            "27",
            "28",
            "29",
            "30"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [
              820,
              932,
              901,
              934,
              1290,
              1330,
              1320,
              932,
              901,
              934,
              1290,
              1330,
              1320,
              932,
              901,
              934,
              1290,
              1330,
              1320,
              932,
              901,
              934,
              1290,
              1330,
              1320,
              932,
              901,
              934,
              1290,
              1330
            ],
            type: "line",
            areaStyle: {
              color: {
                type: "linear",
                x: 0, //右
                y: 0, //下
                x2: 0, //左
                y2: 1, //上
                colorStops: [
                  {
                    offset: 0,
                    color: "#08222c" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#207651" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            },
            itemStyle: {
              color: "#00fffc"
            },
            lineStyle: {
              color: "#00fffc"
            }
          }
        ]
      },
      maleParams: {
        strokeWidth: 10, //线条宽度
        strokeColor: "#0d70c3", //线条颜色
        trailWidth: 4, //背景线条宽度
        trailColor: "#0d70c3", //背景线条宽度
        percent: 48, //默认情况下是0
        percent2: 50,
        percent3: 80
      },
      femaleParams: {
        strokeWidth: 10, //线条宽度
        strokeColor: "#de6464", //线条颜色
        trailWidth: 4, //背景线条宽度
        trailColor: "#de6464", //背景线条宽度
        percent: 52, //默认情况下是0
        percent2: 50,
        percent3: 80
      },
      ageData: {
        columns: ["age", "num"],
        rows: [
          { age: "20岁以下", num: "1234" },
          { age: "20-30岁", num: "2234" },
          { age: "30-40岁", num: "3234" },
          { age: "40-50岁", num: "4234" },
          { age: "50-60岁", num: "5234" },
          { age: "60岁以上", num: "5234" }
        ]
      },
      ageExtend: {
        tooltip: {},
        legend: {
          show: false
        },
        series: {
          name: "年龄段",
          radius: [58, 43],
          label: {
            formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
            backgroundColor: "#010b24",
            borderColor: "#0d70c3",
            borderWidth: 1,
            borderRadius: 4,
            // shadowBlur:3,
            // shadowOffsetX: 2,
            // shadowOffsetY: 2,
            // shadowColor: '#999',
            // padding: [0, 7],
            rich: {
              a: {
                color: "#999",
                lineHeight: 22,
                align: "center"
              },
              abg: {
                backgroundColor: "#0d70c3",
                width: "100%",
                align: "right",
                height: 22,
                borderRadius: [4, 4, 0, 0]
              },
              hr: {
                borderColor: "#0f458e",
                width: "100%",
                borderWidth: 0.5,
                height: 0
              },
              b: {
                fontSize: 16,
                lineHeight: 33
              },
              per: {
                color: "#eee",
                backgroundColor: "#0d2fc4",
                padding: [4, 4, 7, 4],
                borderRadius: 2
              }
            }
          },
          labelLine: {
            length: 20
          }
        }
      },
      checkInData: {},
      checkInSettings: {
        xAxisType: 'value'
      },
      checkInExtend: {
        xAxis: {
          type: "category",
          data: [
            "9点以前",
            "9-10点",
            "11-12点",
            "13-14点",
            "15-16点",
            "17-18点",
            "18点以后"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            itemStyle: {
              color: "#00ffae"
            },
            lineStyle: {
              color: "#00ffae"
            },
            label: {
              show: true
            },
            markLine: {
              lineStyle: {
                color: "#f00"
              }
            }
          }
        ],
        textStyle: {
          color: "#628ec0"
        }
      }
    };
  },
  async created() {
    let weatherResult = await weather.getWeekWeather();
    this.weathers = weatherResult.data.data;
    for (let i = 0; i < this.weathers.length; i++) {
      let weather = this.weathers[i];
      weather.iconClass =
        "iconfont icon-" + this.getWeatherIcon(weather.wea_img);
      weather.monthDay = this.getMonthDay(weather.date);
      weather.dayName = this.getDayName(i, weather.week);
      if (i == 0) {
        // this.hoursData.rows = weather.hours;
      }
    }
  },
  methods: {
    getWeatherIcon(wea_img) {
      let iconClass = "";
      switch (wea_img) {
        case "xue":
          iconClass = "xue";
          break;
        case "lei":
          iconClass = "zhenyu";
          break;
        case "shachen":
          iconClass = "shachenbao";
          break;
        case "wu":
          iconClass = "wu";
          break;
        case "bingbao":
          iconClass = "bingbao";
          break;
        case "yun":
          iconClass = "duoyun";
          break;
        case "yu":
          iconClass = "yu";
          break;
        case "yin":
          iconClass = "yin";
          break;
        case "qing":
          iconClass = "qing";
          break;
      }
      return iconClass;
    },
    getMonthDay(date) {
      let eventDate = new Date(date);
      let monthDay = `${eventDate.getMonth() + 1}月${eventDate.getDate()}日`;
      return monthDay;
    },
    getDayName(num, week) {
      let dayName = "";
      if (num == 0) {
        dayName = "今天";
      } else if (num == 1) {
        dayName = "明天";
      } else if (num == 2) {
        dayName = "后天";
      } else {
        dayName = week;
      }

      return dayName;
    }
  }
};
</script>

<style lang="scss">
.div-home {
  background-image: url("../assets/img/background.png");
  height: 100vh;
  width: 100vw;
  color: #ffffff;
  .home-top {
    height: 9%;
    width: 100%;
  }
  .home-middle {
    height: 59%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    .middle-left {
      width: 31%;
      height: 100%;
      .div-flow {
        height: 50%;
        width: 100%;
        .flow-real {
          color: #ecb61b;
          padding: 73px 80px 29px 92px;
        }
        .flow-today {
          color: #00d1fe;
          padding: 48px 80px 1px 92px;
        }
        .flow-div {
          // height: 50%;
          // width: 100%;
          display: flex;
          justify-content: space-between;
        }
        .flow-num {
          font-size: 48px;
          width: 49px;
          text-align: center;
        }
      }
      .div-sale {
        display: flex;
        justify-content: space-between;
        height: 50%;
        .sale-channel {
          width: 65%;
          padding: 0px 0px 0px 20px;
          margin-left: -30px;
          margin-top: -12px;
        }
        .sale-num {
          padding: 55px 34px 34px 15px;
          .num-div {
            color: #00d1fe;
            padding: 0px 10px 0px 10px;
            width: 114px;
            font-size: 24px;
            text-align: right;
          }
          .num-today {
            padding: 45px 19px 1px 1px;
          }
          .num-yester {
            padding: 40px 1px 1px 1px;
          }
          .num-month {
            padding: 34px 1px 1px 1px;
          }
        }
      }
    }
    .middle-center {
      width: 38%;
      height: 100%;
      .div-bar {
        padding: 20px 0px 0px 35px;
      }
      .div-heatmap {
        padding: 1px 1px 1px 104px;
        margin-top: -244px;
      }
    }
    .middle-right {
      width: 31%;
      height: 100%;
      overflow: hidden;
      .div-weather {
        padding: 78px 56px 1px 23px;
        .weather-div {
          border-top: 1px solid #00d1fe;
          border-bottom: 1px solid #00d1fe;
          border-left: 1px solid #00d1fe;
          display: flex;
          justify-content: space-between;
          .day-weather {
            padding: 5px 0px 5px 0px;
            border-right: 1px solid #00d1fe;
            text-align: center;
            font-size: 10px;
            width: 75px;
          }
        }
        .hour-div {
          overflow: hidden;
          height: 165px;
          margin-top: -20px;
          margin-left: -47px;
        }
      }
      .div-trend {
        padding: 0px 0px 0px 22px;
        width: 100%;
        .trend-sale {
          padding: 17px 0px 0px 0px;
        }
        .trend-check {
          margin-top: -68px;
        }
      }
    }
  }
  .home-bottom {
    height: 32%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    .bottom-left {
      height: 100%;
      width: 55%;
      display: flex;
      justify-content: space-between;
      .div-sex {
        height: 100%;
        width: 48%;
        .sex-ratio {
          display: flex;
          justify-content: space-between;
          width: 100%;
          height: 67%;
          .circle-div {
            display: flex;
            justify-content: space-between;
            padding: 0px 18px 0px 0px;
            .circle-icon {
              .iconfont {
                font-size: 45px;
              }
            }
            .circle-percent {
              .percent-title {
                color: #ffffff;
                font-size: 10px;
              }
              .percent-value {
                font-size: 20px;
              }
            }
          }
          .ratio-male {
            padding: 87px 0px 0px 111px;
            color: #0d70c3;
          }
          .ratio-female {
            padding: 87px 76px 0px 0px;
            color: #de6464;
          }
        }
        .sex-num {
          display: flex;
          justify-content: space-between;
          font-size: 22px;
          padding: 30px 75px 0px 111px;
          .num-male {
            color: #0b99fd;
          }
          .num-female {
            color: #de6464;
          }
          .num-div {
            width: 137px;
            text-align: center;
            padding: 8px 0px 0px 0px;
          }
        }
      }
      .div-age {
        height: 100%;
        width: 52%;
        overflow: hidden;
        margin-top: -10px;
      }
    }
    .bottom-right {
      height: 100%;
      width: 45%;
      overflow: hidden;
      .check-in {
        height: 100%;
            padding: 38px 0px 0px 10px;
      }
    }
  }
}
</style>