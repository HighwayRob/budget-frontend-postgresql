import axios from 'axios';
import * as myConstants from '../Services/User_API_Base_URL'

class ExpenseDetailsViewService {

    getExpenseDetailsView(){
        return axios.get(myConstants.USER_API_BASE_URL + "expensedetailsview");
    }

    getExpenseDetailsViewByMonth(month){
        return axios.get(myConstants.USER_API_BASE_URL + "expensedetailsviewbymonth/" + month);
    }

    // createAssets(assets){
    //     return axios.post(myConstants.USER_API_BASE_URL + "assets", assets);
    // }

    // getAssetsById(assetsid){
    //     return axios.get(myConstants.USER_API_BASE_URL  + "assets/" + assetsid);
    // }

    // updateAssets(assets, assetsid){
    //     return axios.put(myConstants.USER_API_BASE_URL + 'assets/' + assetsid, assets);
    // }

    // deleteAssets(assetsid){
    //     return axios.delete(myConstants.USER_API_BASE_URL + 'assets/' + assetsid);
    // }
}
export default new ExpenseDetailsViewService()