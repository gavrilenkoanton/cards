import axios from "axios";

export const RegisterAPI = {
    register: (email: string, password: string) => {
        return axios.post
        ('https://cards-nya-back.herokuapp.com/1.0/auth/register',{email, password});

    }
};