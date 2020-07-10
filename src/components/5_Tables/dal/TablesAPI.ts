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

export const tablesAPI = {
    getTables: (pageSize: number, currentPage: number) => {
        let token = document.cookie
        return instance.get<responseType>
        (`cards/pack?&token=${token}&pageCount=${pageSize}&page=${currentPage}`);
    },
    addNewDeck: (name: string) => {
        let token = document.cookie
        return instance.post<responseType>
        (`cards/pack`, {cardsPack: {name: name}, token: token})
    },
    deleteDeck: (id: string) => {
        let token = document.cookie
        return instance.delete<responseType>(
            `cards/pack?token=${token}&id=${id}`
        )
    },
    changeDeckName: (newName: string, id: string) => {
        let token = document.cookie
        return instance.put<responseType>(
            `cards/pack`, {cardsPack: {name: newName, _id: id}, token: token}
        )
    },
    getSearchedDeck: (deckName: string) => {
        let token = document.cookie;
        return instance.get<responseType>(`cards/pack?&token=${token}&packName=${deckName}`);
    },
    ascendingSortByName: (pageCount: number, currentPage: number) => {
        let token = document.cookie;
        return instance.get<responseType>
        (`cards/pack?&token=${token}&pageCount=${pageCount}&page=${currentPage}&sortPacks=1name`);
    },
    descendingSortByName: (pageCount: number, currentPage: number) => {
        let token = document.cookie;
        return instance.get<responseType>
        (`cards/pack?&token=${token}&pageCount=${pageCount}&page=${currentPage}&sortPacks=-1name`);
    },
};
