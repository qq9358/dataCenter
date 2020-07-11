export default {
    formatZero(num, len) {
        if(String(num).length > len) return num;
        return (Array(len).join(0) + num).slice(-len);
    },
    getIntNum(string) {
      let intNum = 0;
      if (string != null) {
        intNum = parseInt(string);
      }
      return intNum;
    },
    getFloatNum(string){
      let floatNum = 0;
      if(string){
        floatNum = parseFloat(string);
      }
      return floatNum;
    }
}