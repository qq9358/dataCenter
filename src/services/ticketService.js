import ajax from "@/utils/ajax.js";
import qs from "qs";

export default {
    async getTicketCheckOverviewAsync(input) {
        let response = await ajax.post(`/ticket/GetTicketCheckOverviewAsync`, input);
        return response.result;
    },
    async statTicketSaleAsync(input) {
        const response = await ajax.post("/ticket/StatTicketSaleAsync", qs.stringify(input));
        return response.result;
    },
    async statTouristByAreaAsync(input){
        const response = await ajax.post(`/ticket/StatTouristByAreaAsync`, qs.stringify(input));
        return response.result;
    },
    async statTouristBySexAsync(input){
        const response = await ajax.post(`/ticket/StatTouristBySexAsync`, qs.stringify(input));
        return response.result;
    },
    async statTouristByAgeRangeAsync(input){
        const response = await ajax.post(`/ticket/StatTouristByAgeRangeAsync`, qs.stringify(input));
        return response.result;
    },
    async statTicketCheckInAsync(input){
        const response = await ajax.post(`/ticket/StatTicketCheckInAsync`, qs.stringify(input));
        return response.result;
    }
}