import axios from 'axios';

const API_URL = 'http://localhost:8080/api/subject/';

class SubjectService{
    getAllCategories(){
        return axios.get(API_URL + `all`);
    }
}
export default new SubjectService();