import axios from "axios";

const instance = axios.create({
    baseURL: 'https://cards-nya-back.herokuapp.com/1.0/'
});

export const tablesAPI = {
  getTables: () => {
      console.log(document.cookie)
      let token = document.cookie
    return instance.get
      (`cards/pack?&token=${token}`);
  },
  addNewDeck: (name: string)=>{
      debugger
      let token = document.cookie
      return instance.post
      (`cards/pack`,{cardsPack: {name: name}, token: token})
      //     .then(res => res.data
      // )

  }
};

    // ?&token=${token}&user_id=${myUserId}&pageCount=12&page=${page}