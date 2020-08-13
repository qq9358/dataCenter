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
            <div class="hour-win">
              <div
                v-for="(hour,hourIndex) in hoursData.rows"
                :key="hourIndex"
                class="win-div"
              >{{hour.win}}{{hour.win_speed}}</div>
            </div>
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
          <ve-ring :data="ageData" :extend="ageExtend" width="510px" height="350px"></ve-ring>
        </div>
      </div>
      <div class="bottom-right">
        <div class="check-in">
          <ve-line
            :data="checkInData"
            width="790px"
            height="330px"
            :settings="checkInSettings"
            :extend="checkInExtend"
          ></ve-line>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import processCircle from "@/components/Circle.vue";
import weather from "@/utils/weather.js";
import formatJs from "@/utils/format.js";
import ticketService from "@/services/ticketService.js";
import staffService from "@/services/staffService.js";

export default {
  name: "Home",
  components: {
    processCircle,
  },
  data() {
    return {
      realNum: "0000000",
      todayNum: "0000000",
      todaySale: 0,
      yesterSale: 0,
      monthSale: 0,
      weathers: [],
      hoursData: {
        columns: ["day", "tem"],
        rows: [
          { day: "1", win: "西南风1级", tem: "21" },
          { day: "2", win: "西南风2级", tem: "22" },
          { day: "3", win: "西南风3级", tem: "33" },
          { day: "4", win: "西南风4级", tem: "24" },
          { day: "5", win: "西南风5级", tem: "25" },
          { day: "6", win: "西南风6级", tem: "36" },
          { day: "7", win: "西南风7级", tem: "27" },
          { day: "8", win: "西南风8级", tem: "28" },
        ],
      },
      hoursSettings: {
        legendName: "",
      },
      hoursExtend: {
        yAxis: {
          show: false,
          axisLine: {
            show: false,
          },
        },
        xAxis: {
          show: false,
        },
        series: {
          label: {
            show: true,
            formatter: function (params) {
              return params.data[1] + "℃";
            },
            color: "#e9e9e9",
          },
          lineStyle: {
            color: "#de5420",
          },
          itemStyle: {
            color: "#de5420",
          },
        },
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
          { lat: 103.823557, lng: 36.058039, 人数: 500 },
        ],
      },
      heatmapSettings: {
        position: "china",
        type: "map",
        geo: {
          label: {
            emphasis: {
              show: false,
            },
          },
          itemStyle: {
            normal: {
              areaColor: "#323c48",
              borderColor: "#628d4c",
            },
            emphasis: {
              areaColor: "#2a333d",
            },
          },
        },
      },
      heatmapExtend: {
        visualMap: {
          show: false,
        },
      },
      barData: {
        columns: ["name", "value"],
        rows: [
          { name: "深圳", value: 593 },
          { name: "广州", value: 700 },
          { name: "上海", value: 893 },
          { name: "北京", value: 993 },
          { name: "杭州", value: 1093 },
        ],
      },
      barSettings: {
        dimension: ["name"],
        metrics: ["value"],
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
                  color: "#104a9c", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#42eb84", // 100% 处的颜色
                },
              ],
              globalCoord: false, // 缺省为 false
            },
          },
          label: {
            show: true,
            position: "right",
            color: "#65eab9",
          },
        },
        xAxis: {
          show: false,
        },
        yAxis: {
          data: [
            {
              value: "杭州",
              textStyle: {
                color: "#4f73a0",
              },
            },
            {
              value: "广州",
              textStyle: {
                color: "#4f73a0",
              },
            },
            {
              value: "上海",
              textStyle: {
                color: "#4f73a0",
              },
            },
            {
              value: "北京",
              textStyle: {
                color: "#4f73a0",
              },
            },
            {
              value: "深圳",
              textStyle: {
                color: "#4f73a0",
              },
            },
          ],
          axixLine: {
            lineStyle: {
              color: "#0f0",
            },
          },
        },
      },
      channelData: {
        columns: ["name", "value"],
        rows: [
          { name: "微信", value: "1234.56" },
          { name: "官网", value: "2234.56" },
          { name: "自助机", value: "3234.56" },
          { name: "分销", value: "4234.56" },
          { name: "窗口", value: "5234.56" },
        ],
      },
      channelExtend: {
        tooltip: {},
        legend: {
          right: 0,
          top: 130,
          orient: "vertical",
          textStyle: {
            color: "#628ec0",
          },
        },
        series: {
          radius: [58, "43"],
          label: {
            formatter: function (params) {
              return params.percent + "%";
            },
            textStyle: {
              color: "#fff",
            },
          },
        },
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
            "30",
          ],
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: true,
            lineStyle: {
              color: "#08567a",
              width: "2",
            },
          },
          splitLine: {
            lineStyle: {
              color: "#08567a",
            },
          },
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
              1330,
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
                    color: "#01213a", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#016c8d", // 100% 处的颜色
                  },
                ],
                globalCoord: false, // 缺省为 false
              },
            },
            itemStyle: {
              color: "#00fffc",
            },
            lineStyle: {
              color: "#00fffc",
            },
          },
        ],
        textStyle: {
          color: "#c6c6c6",
        },
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
            "30",
          ],
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: true,
            lineStyle: {
              color: "#08567a",
              width: "2",
            },
          },
          splitLine: {
            lineStyle: {
              color: "#08567a",
            },
          },
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
              1330,
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
                    color: "#08222c", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#207651", // 100% 处的颜色
                  },
                ],
                globalCoord: false, // 缺省为 false
              },
            },
            itemStyle: {
              color: "#00fffc",
            },
            lineStyle: {
              color: "#00fffc",
            },
          },
        ],
        textStyle: {
          color: "#c6c6c6",
        },
      },
      maleParams: {
        strokeWidth: 10, //线条宽度
        strokeColor: "#0d70c3", //线条颜色
        trailWidth: 4, //背景线条宽度
        trailColor: "#0d70c3", //背景线条宽度
        percent: 48, //默认情况下是0
        percent2: 50,
        percent3: 80,
      },
      femaleParams: {
        strokeWidth: 10, //线条宽度
        strokeColor: "#de6464", //线条颜色
        trailWidth: 4, //背景线条宽度
        trailColor: "#de6464", //背景线条宽度
        percent: 52, //默认情况下是0
        percent2: 50,
        percent3: 80,
      },
      ageData: {
        columns: ["name", "value"],
        rows: [
          { name: "20岁以下", value: "1234" },
          { name: "20-30岁", value: "2234" },
          { name: "30-40岁", value: "3234" },
          { name: "40-50岁", value: "4234" },
          { name: "50-60岁", value: "5234" },
          { name: "60岁以上", value: "5234" },
        ],
      },
      ageExtend: {
        tooltip: {},
        legend: {
          show: false,
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
                color: "#b3dae7",
                lineHeight: 22,
                align: "center",
              },
              abg: {
                backgroundColor: "#0d70c3",
                width: "100%",
                align: "right",
                height: 22,
                borderRadius: [4, 4, 0, 0],
              },
              hr: {
                borderColor: "#0f458e",
                width: "100%",
                borderWidth: 0.5,
                height: 0,
              },
              b: {
                fontSize: 16,
                lineHeight: 33,
              },
              per: {
                color: "#eee",
                backgroundColor: "#0d2fc4",
                padding: [4, 4, 7, 4],
                borderRadius: 2,
              },
            },
          },
          labelLine: {
            length: 20,
          },
        },
      },
      checkInData: {},
      checkInSettings: {
        xAxisType: "value",
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
            "18点以后",
          ],
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: true,
            lineStyle: {
              color: "#08567a",
              width: "2",
            },
          },
          splitLine: {
            lineStyle: {
              color: "#08567a",
            },
          },
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            itemStyle: {
              color: "#00ffae",
            },
            lineStyle: {
              color: "#00ffae",
            },
            label: {
              show: true,
            },
            markLine: {
              lineStyle: {
                color: "#f00",
              },
            },
          },
        ],
        textStyle: {
          color: "#628ec0",
        },
      },
      todayDate: undefined,
    };
  },
  async created() {
    await this.login();
    await this.getData();
    setInterval(async () => {
      await this.getData();
    }, 1000 * 60 * 5);
  },
  methods: {
    async login() {
      let input = {
        userName: "admin",
        password: "admin",
      };
      await staffService.loginAsync(input);
    },
    async getData() {
      await this.getWeather();
      await this.statCheckOverview();
      await this.statTicketSale();
      await this.statTourist();
      await this.statTicketCheck();
    },
    async getWeather() {
      let weatherResult = await weather.getWeekWeather();
      if (weatherResult.data.data) {
        this.weathers = weatherResult.data.data;
        for (let i = 0; i < this.weathers.length; i++) {
          let weather = this.weathers[i];
          weather.iconClass =
            "iconfont icon-" + this.getWeatherIcon(weather.wea_img);
          weather.monthDay = this.getMonthDay(weather.date);
          weather.dayName = this.getDayName(i, weather.week);
          if (i == 1) {
            this.hoursData.rows = weather.hours;
          }
        }
        for (let i = 0; i < this.hoursData.rows.length; i++) {
          let hour = this.hoursData.rows[i];
          hour.tem = hour.tem.slice(0, hour.tem.length - 1);
        }
      }
    },
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
      let monthDay = `${eventDate.getMonth() + 1}月${
        eventDate.getDate() - 1
      }日`;
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
    },
    async statCheckOverview() {
      let input = {
        startDate: "2010-01-01",
        endDate: "2020-12-12",
      };
      let ticketCheckOverviewResult = await ticketService.getTicketCheckOverviewAsync(
        input
      );
      this.realNum = formatJs.formatZero(
        ticketCheckOverviewResult.scenicRealTimeQuantity,
        7
      );
      this.todayNum = formatJs.formatZero(
        ticketCheckOverviewResult.scenicCheckInQuantity,
        7
      );
    },
    async statTicketSale() {
      let newDate = new Date();
      this.todayDate = new Date(
        newDate.getFullYear() +
          "/" +
          (newDate.getMonth() + 1) +
          "/" +
          newDate.getDate() +
          " 23:59:59"
      );
      await this.statChannelTicketSale();
      await this.statTodayTicketSale();
      await this.statYesterTicketSale();
      await this.statMonthTicketSale();
    },
    async statChannelTicketSale() {
      let monthCTime =
        this.todayDate.getFullYear() +
        "-" +
        (this.todayDate.getMonth() + 1) +
        "-01";
      let tradeResult = await this.getDaySaleStat(
        this.todayDate,
        monthCTime,
        7
      );
      if (tradeResult.length > 0) {
        this.channelData.rows = this.getTradeChartData(
          tradeResult,
          "statType",
          "realMoney",
          "float"
        );
      }
    },
    async statTodayTicketSale() {
      let yesterResult = await this.getDaySaleStat(this.todayDate);
      if (yesterResult.length > 0) {
        this.todaySale = yesterResult[0]["realMoney"];
      }
    },
    async statYesterTicketSale() {
      let yesterDate = new Date();
      yesterDate.setTime(this.todayDate.getTime() - 24 * 60 * 60 * 1000);
      let yesterResult = await this.getDaySaleStat(yesterDate);
      if (yesterResult.length > 0) {
        this.yesterSale = yesterResult[0]["realMoney"];
      }
    },
    async statMonthTicketSale() {
      let monthCTime =
        this.todayDate.getFullYear() +
        "-" +
        (this.todayDate.getMonth() + 1) +
        "-01";
      let tradeResult = await this.getDaySaleStat(
        this.todayDate,
        monthCTime,
        7
      );
      if (tradeResult.length > 0) {
        this.monthSale = tradeResult[0]["realMoney"];
      }
    },
    getTradeChartData(data, nameStr, valueStr, numFormat) {
      if (nameStr == "statType") {
        this.monthSale = data[data.length - 1][valueStr];
      }
      let rows = [];
      for (let i = 0; i < data.length - 1; i++) {
        rows.push({
          name: data[i][nameStr],
          value:
            numFormat == "float"
              ? formatJs.getFloatNum(data[i][valueStr])
              : formatJs.getIntNum(data[i][valueStr]),
        });
      }
      return rows;
    },
    async getDaySaleStat(date, startCTime, statType) {
      if (startCTime == undefined) {
        startCTime =
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate();
      }
      if (statType == undefined) {
        statType = 3;
      }
      let endCTime =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate() +
        " 23:59:59";
      let input = {
        StartCTime: startCTime,
        EndCTime: endCTime,
        StatType: statType,
      };
      let result = await ticketService.statTicketSaleAsync(input);
      return result;
    },
    async statTourist() {
      let yearDate = new Date();
      yearDate.setTime(this.todayDate.getTime() - 1000 * 60 * 60 * 24 * 365);
      await this.statTouristByArea(yearDate);
      await this.statTouristBySex(yearDate);
      await this.statTouristByAgeRange(yearDate);
    },
    async statTouristByArea(yearDate) {
      let input = {
        startCTime: yearDate,
        endCTime: this.todayDate,
      };
      let areaResult = await ticketService.statTouristByAreaAsync(input);
      areaResult.data.push({
        地区: "合计",
        合计: "无效",
      });
      this.barData.rows = this.getTradeChartData(
        areaResult.data,
        "地区",
        "合计"
      );
      let yAxisData = [];
      for (let i = 0; i < areaResult.data.length - 1; i++) {
        let dataItem = areaResult.data[i];
        yAxisData.push({
          value: dataItem["地区"],
          textStyle: {
            color: "#4f73a0",
          },
        });
      }
      this.barExtend.yAxis.data = yAxisData;
    },
    async statTouristBySex(yearDate) {
      let input = {
        startCTime: yearDate,
        endCTime: this.todayDate,
      };
      let sexResult = await ticketService.statTouristBySexAsync(input);
      this.maleNum = sexResult.data[0].人数;
      this.femaleNum = sexResult.data[1].人数;
      this.maleParams.percent = parseInt(
        (this.maleNum / (this.maleNum + this.femaleNum)) * 100
      );
      this.femaleParams.percent = parseInt(
        (this.femaleNum / (this.maleNum + this.femaleNum)) * 100
      );
    },
    async statTouristByAgeRange(yearDate) {
      let input = {
        startCTime: yearDate,
        endCTime: this.todayDate,
      };
      let ageRangeResult = await ticketService.statTouristByAgeRangeSimpleAsync(
        input
      );
      if (ageRangeResult.data.length > 1) {
        this.ageData.rows = [];
        ageRangeResult.data.forEach((dataItem) => {
          if (dataItem.ageRange != "未知") {
            this.ageData.rows.push({
              name: dataItem.ageRange,
              value: dataItem.column1,
            });
          }
        });
      }
    },
    async getDayCheckStat(date, startCTime, statType) {
      if (startCTime == undefined) {
        startCTime =
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate();
      }
      if (statType == undefined) {
        statType = 3;
      }
      let endCTime =
        date.getFullYear() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getDate() +
        " 23:59:59";
      let result = await ticketService.statTicketCheckInAsync({
        StartCTime: startCTime,
        EndCTime: endCTime,
        StatType: statType,
        ifByGround: true,
      });
      return result;
    },
    async statTicketCheck() {
      let peakResult = await this.getDayCheckStat(this.todayDate, undefined, 1);
      console.log(peakResult);
      if (peakResult.data.length > 0) {
        peakResult.data.push({
          项目: "合计",
          日期: "--",
          合计: "0",
        });
        let peakResultSum = peakResult.data[peakResult.data.length - 1];
        peakResult.columns.forEach((column) => {
          console.log(column);
          if (column != "项目" && column != "日期" && column != "合计") {
            peakResultSum[column] = 0;
            peakResult.data.forEach((dataItem) => {
              peakResultSum[column] += dataItem[column];
            });
          }
        });
        console.log(peakResultSum);
        let peakSumData = [peakResultSum];
        this.getPeakChartData(peakSumData);
      }
    },
    getPeakChartData(data) {
      let rows = [];
      rows.push({ 时间: "08:00", 人数: formatJs.getIntNum(data[0]["8点前"]) });
      rows.push({
        时间: "10:00",
        人数:
          formatJs.getIntNum(data[0]["08-09"]) +
          formatJs.getIntNum(data[0]["09-10"]),
      });
      for (let i = 12; i < 19; i += 2) {
        let dataTen = data[0][i - 2 + "-" + (i - 1)];
        let dataEle = data[0][i - 1 + "-" + i];
        rows.push({
          时间: i + ":00",
          人数: formatJs.getIntNum(dataTen) + formatJs.getIntNum(dataEle),
        });
      }
      rows.push({
        时间: "18:00",
        人数:
          formatJs.getIntNum(data[0]["18-19"]) +
          formatJs.getIntNum(data[0]["19-20"]) +
          formatJs.getIntNum(data[0]["20点后"]),
      });
      this.checkInExtend.series[0].data = rows.map((row) => {
        return row.人数;
      });
    },
  },
};
</script>

<style lang="scss">
.div-home {
  background-image: url("../assets/img/background.png");
  background-size: 100% 100%;
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
          padding: 68px 80px 29px 92px;
        }
        .flow-today {
          color: #00d1fe;
          padding: 40px 80px 1px 92px;
        }
        .flow-div {
          // height: 50%;
          // width: 100%;
          display: flex;
          justify-content: space-between;
        }
        .flow-num {
          font-size: 55px;
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
          .hour-win {
            display: flex;
            justify-content: space-between;
            margin-top: -98px;
            text-align: center;
            font-size: 10px;
            transform: scale(0.9);
            width: 98%;
            margin-left: 5%;
            .win-div {
            }
          }
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