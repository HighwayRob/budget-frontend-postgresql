import axios from 'axios';
import * as myConstants from '../Services/User_API_Base_URL'

class MonthService {

    getMonth(){
        return axios.get(myConstants.USER_API_BASE_URL + "month");
    }

    // createAssets(assets){
    //     return axios.post(myConstants.USER_API_BASE_URL + "assets", assets);
    // }

    getMonthById(monthid){
        return axios.get(myConstants.USER_API_BASE_URL  + "month/" + monthid);
    }

    updateMonth(month, monthid){
        return axios.put(myConstants.USER_API_BASE_URL + 'month/' + monthid, month);
    }

}
export default new MonthService()