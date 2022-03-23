import axios from 'axios';
import * as myConstants from '../Services/User_API_Base_URL'

class ExpenseService {

    getExpense(){
        return axios.get(myConstants.USER_API_BASE_URL + "expense");
    }

    createExpense(expense){
        return axios.post(myConstants.USER_API_BASE_URL + "expense", expense);
    }

    getExpenseByCategoryId(categoryid){
        return axios.get(myConstants.USER_API_BASE_URL  + "expensebycategoryid/" + categoryid);
    }

    // updateAssets(assets, assetsid){
    //     return axios.put(myConstants.USER_API_BASE_URL + 'assets/' + assetsid, assets);
    // }

    deleteExpense(expenseid){
        return axios.delete(myConstants.USER_API_BASE_URL + 'expense/' + expenseid);
    }
}
export default new ExpenseService()