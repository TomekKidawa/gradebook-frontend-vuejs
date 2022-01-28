import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/grades/';

class GradeService{
    getGradesForUser(id){
        return axios.get(API_URL+ `user/` + `${id}` + '/grades');
    }
    deleteGradeById(id){
        return axios.delete(API_URL + `delete/` + `${id}`, { headers: authHeader() });
    }
    addGradeService(data){
        return axios.post(API_URL + `add`, data)
    }
}
export default new GradeService();