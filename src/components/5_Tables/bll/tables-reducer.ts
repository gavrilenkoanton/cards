import {tablesAPI} from "../dal/TablesAPI";

export type initialStateType = {
    tables: object[],
    loadingTables: boolean
}

const initialState = {
    tables: [{name: "first", _id: 1}, {name: "second",  _id: 2}, {name: "third",  _id: 3}],
    loadingTables: false
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
export const renameDeckSuccess = (ans: any) => {
    return {type: "RENAME_DECK", ans}
}
export const loadingToggleAC = (toggle: boolean) => {
    return {type: "LOADING_TABLES", toggle}
}

export const tablesReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case "LOADING_TABLES":
            return {
                ...state,
                loadingTables: action.toggle

            };
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
                tables: state.tables.filter(t => t._id !== action.ans)
            };
        case "RENAME_DECK":
            return {
                ...state,
                tables: state.tables.map(tl => {
                    if (tl._id !== action.ans.data.updatedCardsPack._id) return tl;
                    else return {...tl, name: action.ans.data.updatedCardsPack.name}
                })
            };
        default:
            return state
    }
}

export const getTablesTH = () => {
    return async (dispatch: any) => {
        dispatch(loadingToggleAC(true))
        try {
            const ans = await tablesAPI.getTables()
            document.cookie = `${ans.data.token}; max-age=3600`;
            dispatch(getTablesSuccess(ans))
        } catch (e) {

        } finally {
            dispatch(loadingToggleAC(false))
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
export const changeDeckNameTH = (newName: string, id: string) => {
    return async (dispatch: any) => {
        try {
            const ans = await tablesAPI.changeDeckName(newName, id)
            document.cookie = `${ans.data.token}; max-age=3600`;
            dispatch(renameDeckSuccess(ans))
        } catch (e) {

        } finally {

        }
    }
};
