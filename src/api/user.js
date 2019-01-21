import axios from 'axios';

const baseURL = 'http://localhost:5000';

const userAPI = axios.create({
    baseURL
})

export default {
    login(user){
        console.log('user');
        console.log(user);
        return userAPI.post('/login', user)
    }
}

