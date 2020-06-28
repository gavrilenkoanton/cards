import axios from "axios";

type responseType = {
    addedUser: {email: string, isAdmin: boolean, __v: number, _id: string}
    success: boolean
};

export const RegisterAPI = {
    register: (email: string, password: string) => {
        return axios.post<responseType>
        ('https://cards-nya-back.herokuapp.com/1.0/auth/register',{email, password});
    }
};

