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
            <div v-for="(num,realIndex) in realNum" :key="realIndex" class="flow-num">{{num}}</div>
          </div>
        </div>
        <div class="div-sale">
          <div class="sale-chart"></div>
          <div class="sale-num">
            <div class="num-div num-today">¥{{todaySale}}</div>
            <div class="num-div num-yester">¥{{yesterSale}}</div>
            <div class="num-div num-month">¥{{monthSale}}</div>
          </div>
        </div>
      </div>
      <div class="middle-center"></div>
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
        </div>
        <div class="div-trend"></div>
      </div>
    </div>
    <div class="home-bottom">
      <div class="bottom-left">
        <div class="div-sex"></div>
        <div class="div-age"></div>
      </div>
      <div class="bottom-right"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import weather from "@/utils/weather.js";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      realNum: "0012345",
      todayNum: "0123456",
      todaySale: 1234.56,
      yesterSale: 2345.67,
      monthSale: 34567.89,
      weathers: [],
      hours: []
    };
  },
  async created() {
    let weatherResult = await weather.getWeekWeather();
    console.log(weatherResult);
    this.weathers = weatherResult.data.data;
    for (let i = 0; i < this.weathers.length; i++) {
      let weather = this.weathers[i];
      weather.iconClass =
        "iconfont icon-" + this.getWeatherIcon(weather.wea_img);
      weather.monthDay = this.getMonthDay(weather.date);
      weather.dayName = this.getDayName(i, weather.week);
      if(i == 0){
        this.hours = weather.hours;
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
        .sale-chart {
          height: 100%;
          width: 65%;
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
    }
    .middle-right {
      width: 31%;
      height: 100%;
      .div-weather {
        padding: 62px 60px 1px 22px;
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
            width: 71px;
          }
        }
      }
      .div-trend {
        height: 50%;
        width: 100%;
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
      }
      .div-age {
        height: 100%;
        width: 52%;
      }
    }
    .bottom-right {
      height: 100%;
      width: 45%;
    }
  }
}
</style>