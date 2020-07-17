import {deckAPI} from "../dal/DeckAPI";

const SET_CARDS = 'SET_CARDS';
const SHOW_SETTINGS = 'SHOW_SETTINGS';
const LOADING_CARDS = 'LOADING_CARDS';
const LOADING_CHANGES = 'LOADING_CHANGES';
const ADD_CARD = 'ADD_CARD';
const DELETE_CARD = 'DELETE_CARD';
const RENAME_CARD = 'RENAME_CARD';


export type initialStateType = {
    loadingCards: boolean,
    loadingChanges: boolean,
    cards: object[],
    showSettings: boolean
}

const initialState = {
    loadingCards: false,
    loadingChanges: false,
    cards: [{_id: 1}],
    showSettings: false
};

type getCardsSuccessType = { type: typeof SET_CARDS, ans: object }
type showSettingsToggleType = { type: typeof SHOW_SETTINGS, showSettings: boolean }
type loadingCardsToggleType = { type: typeof LOADING_CARDS, loading: boolean }
type loadingChangesToggleType = { type: typeof LOADING_CHANGES, loading: boolean }
type addCardSuccessType = { type: typeof ADD_CARD, ans: object }
type deleteCardSuccessType = { type: typeof DELETE_CARD, ans: object }
type renameCardSuccessType = { type: typeof RENAME_CARD, ans: object }

export const getCardsSuccess = (ans: any) => {
    return {type: SET_CARDS, ans}
}
export const showSettingsToggleAC = (showSettings: boolean) => {
    return {type: SHOW_SETTINGS, showSettings}
}
export const loadingCardsToggleAC = (loading: boolean) => {
    return {type: LOADING_CARDS, loading}
}
export const loadingChangesToggleAC = (loading: boolean) => {
    return {type: LOADING_CHANGES, loading}
}
export const addCardSuccess = (ans: any) => {
    return {type: ADD_CARD, ans}
}
export const deleteCardSuccess = (ans: any) => {
    return {type: DELETE_CARD, ans}
}
export const renameCardSuccess = (ans: any) => {
    return {type: RENAME_CARD, ans}
}

type actionTypes =
    getCardsSuccessType
    |showSettingsToggleType
    |loadingCardsToggleType
    |loadingChangesToggleType
    |addCardSuccessType
    |deleteCardSuccessType
    |renameCardSuccessType

export const deckReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case SET_CARDS:
            return {
                ...state,
                cards: action.ans.cards,
                showSettings: false
            };
        case ADD_CARD:
            return {
                ...state,
                cards: [action.ans.newCard, ...state.cards]
            };
        case DELETE_CARD:
            return {
                ...state,
                cards: state.cards.filter(t => t._id !== action.ans.deletedCard._id)
            };
        case RENAME_CARD:
            return {
                ...state,
                cards: state.cards.map(tl => {
                    if (tl._id !== action.ans.updatedCard._id) return tl;
                    else return {
                        ...tl,
                        answer: action.ans.updatedCard.answer,
                        question: action.ans.updatedCard.question
                    }
                })
            };
        case SHOW_SETTINGS:
            return {
                ...state,
                showSettings: action.showSettings
            };
        case LOADING_CARDS:
            return {
                ...state,
                loadingCards: action.loading
            };
        case LOADING_CHANGES:
            return {
                ...state,
                loadingChanges: action.loading
            };
        default:
            return state
    }
}

export const getCardsTH = (idOfDeck: string) => {
    return async (dispatch: any) => {
        dispatch(loadingCardsToggleAC(true))
        try {
            const response = await deckAPI.getCards(idOfDeck);
            document.cookie = `${response.data.token}; max-age=3600`;
            dispatch(getCardsSuccess(response.data));
        } catch (e) {

        } finally {
            dispatch(loadingCardsToggleAC(false))
        }
    }
};
export const addNewCardTH = (question: string, answer: string, id: string) => {
    return async (dispatch: any) => {
        dispatch(loadingChangesToggleAC(true))
        try {
            const response = await deckAPI.addCard(question, answer, id);
            document.cookie = `${response.data.token}; max-age=3600`;
            dispatch(addCardSuccess(response.data));
        } catch (e) {

        } finally {
            dispatch(loadingChangesToggleAC(false))
        }
    }
};
export const deleteCardTH = (id: string) => {
    return async (dispatch: any) => {
        dispatch(loadingChangesToggleAC(true))
        try {
            const response = await deckAPI.deleteCard(id);
            document.cookie = `${response.data.token}; max-age=3600`;
            dispatch(deleteCardSuccess(response.data));
        } catch (e) {

        } finally {
            dispatch(loadingChangesToggleAC(false))
        }
    }
};
export const renameCardTH = (id: string, newQuestion: string, newAnswer: string) => {
    return async (dispatch: any) => {
        dispatch(loadingChangesToggleAC(true))
        try {
            const response = await deckAPI.renameCard(id, newQuestion, newAnswer);
            document.cookie = `${response.data.token}; max-age=3600`;
            dispatch(renameCardSuccess(response.data));
        } catch (e) {

        } finally {
            dispatch(loadingChangesToggleAC(false))

        }
    }
};

