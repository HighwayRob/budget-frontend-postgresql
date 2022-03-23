import axios from 'axios';
import * as myConstants from '../Services/User_API_Base_URL'

class CategoryViewService {

    getCategoryView(){
        return axios.get(myConstants.USER_API_BASE_URL + "categoryview");
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
export default new CategoryViewService()