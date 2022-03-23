import axios from 'axios';
import * as myConstants from '../Services/User_API_Base_URL'

class CategoryService {

    getCategory(){
        return axios.get(myConstants.USER_API_BASE_URL + "category");
    }

    createCategory(category){
         return axios.post(myConstants.USER_API_BASE_URL + "category", category);
    }

    getCategoryById(categoryId){
        return axios.get(myConstants.USER_API_BASE_URL  + "category/" + categoryId);
    }

    updateCategory(category, categoryid){
        return axios.put(myConstants.USER_API_BASE_URL + 'category/' + categoryid, category);
    }

    deleteCategory(categoryid){
        return axios.delete(myConstants.USER_API_BASE_URL + 'category/' + categoryid);
    }
}
export default new CategoryService()