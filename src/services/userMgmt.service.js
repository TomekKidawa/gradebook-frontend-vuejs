import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users/';

class userMgmt{
    getAllUsers(){
        return axios.get(API_URL + `all`);
    }
    getUserById(id){
        return axios.get(API_URL + `${id}`)
    }
    updadeUser(id, data){
        return axios.post(API_URL + `edit/${id}`, data)
    }
    deleteUserById(id) {
        return axios.delete(API_URL + `delete/${id}`);
    }

}
export default new userMgmt();