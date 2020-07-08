import {tablesAPI} from "../dal/TablesAPI";

export type initialStateType = {
    tables: object[]
}

const initialState = {
    tables: [{name: "first", _id: 1}, {name: "second",  _id: 2}, {name: "third",  _id: 3}]
}

export const getTablesSuccess = (ans: any) => {
    return {type: "SET_TABLES", ans}
}
export const addDeckSuccess = (ans: any) => {
    return {type: "ADD_NEW_DECK", ans}
}
export const deleteDeckSuccess = (ans: any) => {
    return {type: "DELETE_DECK", ans}
}

export const tablesReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case "SET_TABLES":
            return {
                ...state,
                tables: action.ans.data.cardPacks

            };
        case "ADD_NEW_DECK":
            return {
                ...state,
                tables: [action.ans, ...state.tables]
            };
        case "DELETE_DECK":
            return {
                ...state,
                tables: state.tables.filter(t => t._id !== action)
            };
        default:
            return state
    }
}

export const getTablesTH = () => {
    return async (dispatch: any) => {
        try {
            const ans = await tablesAPI.getTables()
            document.cookie = `${ans.data.token}; max-age=3600`;
            dispatch(getTablesSuccess(ans))
        } catch (e) {

        } finally {

        }
    }
};
export const addNewDeckTH = (newDeckName: string) => {
    return async (dispatch: any) => {
        try {
            const ans = await tablesAPI.addNewDeck(newDeckName)
            document.cookie = `${ans.data.token}; max-age=3600`;
            dispatch(addDeckSuccess(ans.data.newCardsPack))
        } catch (e) {

        } finally {

        }
    }
};
export const deleteDeckTH = (id: string) => {
    return async (dispatch: any) => {
        try {
            const ans = await tablesAPI.deleteDeck(id)
            console.log(ans.data.deletedCardsPack._id)
            document.cookie = `${ans.data.token}; max-age=3600`;
            dispatch(deleteDeckSuccess(ans.data.deletedCardsPack._id))
        } catch (e) {

        } finally {

        }
    }
};
