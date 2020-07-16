import {storeType} from "../../../BLL/redux-store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {deckAPI} from "../dal/DeckAPI";



export type initialStateType = {
    loadingTables: boolean
    tables: object[],
    searchedName: string,
    currentPage: number,
    pageSize: number,
    totalPacks: number,
    cards: object[]
}

const initialState = {
    loadingTables: false,
    cards: [],
    searchedName: '',
    currentPage: 1,
    pageSize: 4,
    totalPacks: 78
};

export const getCardsSuccess = (ans: any) => {
    return {type: "SET_CARDS", ans}
}

export const deckReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "SET_CARDS":
            return {
                ...state,
                cards: [action.ans.cards]
            };

        default:
            return state
    }
}

export const getCardsTH = (idOfDeck: string) => {
    return async (dispatch: any) => {
        try {
            const response = await deckAPI.getCards(idOfDeck);
            document.cookie = `${response.data.token}; max-age=3600`;
            dispatch(getCardsSuccess(response.data));
        } catch (e) {

        } finally {

        }
    }
};
