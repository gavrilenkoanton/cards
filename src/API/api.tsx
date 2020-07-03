import axios from "axios";

const instance = axios.create({
    baseURL: 'https://cards-nya-back.herokuapp.com/1.0/'
});


export const AuthorizationAPI = {
    login(email: string | null, password: string | null, rememberMe: boolean | null) {
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    authMe(){
        return axios.post('https://cards-nya-back.herokuapp.com/1.0/auth/me',{
            token: document.cookie})
    }
};