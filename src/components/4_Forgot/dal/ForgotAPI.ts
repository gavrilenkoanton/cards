import axios from "axios";

const instance = axios.create({
    baseURL: 'https://cards-nya-back.herokuapp.com/1.0/'
});

export const forgotAPI = {
  forgotPass: (email: string) => {
    return instance.post
      ('https://cards-nya-back.herokuapp.com/1.0/auth/forgot',
        {
          email: email,
          html1: "<a href='http://localhost:3000/#/reset-password/",
          html2: "'>reset-password-link</a>"
        });
  }
};