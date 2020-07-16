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
    cards: [{_id: 1}],
    searchedName: '',
    currentPage: 1,
    pageSize: 4,
    totalPacks: 78,
    showSettings: false
};

export const getCardsSuccess = (ans: any) => {
    return {type: "SET_CARDS", ans}
}
export const showSettingsToggleAC = (showSettings: boolean) => {
    return {type: "SHOW_SETTINGS", showSettings}
}
export const addCardSuccess = (ans: any) => {
    return {type: "ADD_CARD", ans}
}
export const deleteCardSuccess = (ans: any) => {
    return {type: "DELETE_CARD", ans}
}
export const renameCardSuccess = (ans: any) => {
    return {type: "RENAME_CARD", ans}
}

export const deckReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "SET_CARDS":
            return {
                ...state,
                cards: action.ans.cards
            };
        case "ADD_CARD":
            return {
                ...state,
                cards: [action.ans.newCard, ...state.cards]
            };
        case "DELETE_CARD":
            return {
                ...state,
                cards: state.cards.filter(t => t._id !== action.ans.deletedCard._id)
            };
        case "RENAME_CARD":
            return {
                ...state,
                cards: state.cards.map(tl => {
                    if (tl._id !== action.ans.updatedCard._id) return tl;
                    else return {...tl, answer: action.ans.updatedCard.answer, question: action.ans.updatedCard.question }
                })
            };
        case "SHOW_SETTINGS":
            return {
                ...state,
                showSettings: action.showSettings
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
export const addNewCardTH = (question: string, answer: string, id: string) => {
    return async (dispatch: any) => {
        try {
            const response = await deckAPI.addCard(question, answer, id);
            document.cookie = `${response.data.token}; max-age=3600`;
            dispatch(addCardSuccess(response.data));
        } catch (e) {

        } finally {

        }
    }
};
export const deleteCardTH = (id: string) => {
    return async (dispatch: any) => {
        try {
            const response = await deckAPI.deleteCard(id);
            document.cookie = `${response.data.token}; max-age=3600`;
            dispatch(deleteCardSuccess(response.data));
        } catch (e) {

        } finally {

        }
    }
};
export const renameCardTH = (id: string, newQuestion: string, newAnswer: string) => {
    return async (dispatch: any) => {
        try {
            const response = await deckAPI.renameCard(id, newQuestion, newAnswer);
            document.cookie = `${response.data.token}; max-age=3600`;
            dispatch(renameCardSuccess(response.data));
        } catch (e) {

        } finally {

        }
    }
};

