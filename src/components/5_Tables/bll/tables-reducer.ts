import {tablesAPI} from "../dal/TablesAPI";

export type initialStateType = {
    tables: object[]
}

const initialState = {
    tables: [{name: "first"}, {name: "second"}, {name: "third"}]
}

export const getTablesSuccess = (ans: any) => {
    debugger
    return {type: "SET_TABLES", ans}
}
export const addDeckSuccess = (ans: any) => {
    debugger
    return {type: "ADD_NEW_DECK", ans}
}

export const tablesReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case "SET_TABLES":
            debugger
            return {
                ...state,
                tables: action.ans.data.cardPacks

            };
        case "ADD_NEW_DECK":
            debugger
            return {
                ...state,
                tables: [action.ans, ...state.tables]
            };
        default:
            return state
    }
}

export const getTablesTH = () => {
    return async (dispatch: any) => {
        try {
            const ans = await tablesAPI.getTables()
            console.log(ans)
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
            debugger
            console.log(ans.data.newCardsPack)
            document.cookie = `${ans.data.token}; max-age=3600`;
            dispatch(addDeckSuccess(ans.data.newCardsPack))
        } catch (e) {

        } finally {

        }
    }
};

