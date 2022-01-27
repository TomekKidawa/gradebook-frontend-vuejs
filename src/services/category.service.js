import axios from 'axios';

const API_URL = 'http://localhost:8080/api/category/';

class CategoryService{
    getAllCategories(){
        return axios.get(API_URL + `all`);
    }
}
export default new CategoryService();