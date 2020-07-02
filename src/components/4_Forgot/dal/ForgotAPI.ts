import axios from "axios";

const instance = axios.create({
    baseURL: 'https://cards-nya-back.herokuapp.com/1.0/'
});

export const forgotAPI = {
  forgotPass: (email: string) => {
    return instance.post
      ('auth/forgot',
        {
          email: email
        });
  }
};