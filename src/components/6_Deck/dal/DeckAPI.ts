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
    },
    addCard: (question: string, answer: string, id:string) => {
        let token = document.cookie
        return instance.post<responseType>
        (`cards/card`, {card: {cardsPack_id: id, question: question, answer:answer}, token: token});
    },
    deleteCard: (id:string) => {
        let token = document.cookie
        return instance.delete<responseType>
        (`cards/card?token=${token}&id=${id}`);
    },
    renameCard: (id:string, newQuestion: string, newAnswer: string) => {
        let token = document.cookie
        return instance.put<responseType>
        (`cards/card`, {card: {_id: id, question: newQuestion, answer:newAnswer}, token: token});
    }
};
