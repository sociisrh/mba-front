import Vue from "vue";
import moment from "moment";

Vue.filter("dateFormatBr", (value, originalFormat) => {
    let date = moment(value, originalFormat, true);
    if (date.isValid()) {
      return date.format("DD/MM/YYYY");
    }
    return value;
  });

  Vue.filter("dateTimeFormatBr", (value, originalFormat) => {
    let date = moment(value, originalFormat, true);
    if (date.isValid()) {
      return date.format("DD/MM/YY HH:mm:ss");
    }
    return "";
  });
  