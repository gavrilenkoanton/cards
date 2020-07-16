import axios from "axios";

type responseType = {
    cardPacks: [],
    cardPacksTotalCount: number,
    maxGrade: number,
    minGrade: number,
    page: number,
    pageCount: number,
    token: string,
    tokenDeathTime: number,
    newCardsPack: object,
    deletedCardsPack: {
        _id: string
    },
}

const instance = axios.create({
    baseURL: 'https://cards-nya-back.herokuapp.com/1.0/'
});

export const deckAPI = {
    getCards: (id: string) => {
        let token = document.cookie
        return instance.get<responseType>
        (`cards/card?cardsPack_id=${id}&pageCount=10&token=${token}`);
    }
};
