import axios from "axios";
const ajax = axios.create({
    timeout: 10000
  });

export default{
    async getWeekWeather(){
        const response = await ajax.get(`http://tianqiapi.com/api?version=v1&appid=85613182&appsecret=qRCDs9lR`);
        return response;
    }
}