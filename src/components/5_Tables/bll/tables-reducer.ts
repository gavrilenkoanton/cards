import {tablesAPI} from "../dal/TablesAPI";
import {useSelector} from "react-redux";
import {storeType} from "../../../BLL/redux-store";

const SET_SEARCHED_NAME = 'SET_SEARCHED_NAME';
const SET_SEARCHED_PACKS = 'SET_SEARCHED_PACKS';
const SET_PAGINATOR_PAGE_SIZE = 'SET_PAGINATOR_PAGE_SIZE';
const SET_PAGINATOR_CURRENT_PAGE = "SET_PAGINATOR_CURRENT_PAGE";

export type initialStateType = {
    loadingTables: boolean
    tables: object[],
    searchedName: string,
    currentPage: number,
    pageSize: number,
    totalPacks: number
}

const initialState = {
    loadingTables: false,
    tables: [{name: "first", _id: 1}, {name: "second", _id: 2}, {name: "third", _id: 3}],
    searchedName: '',
    currentPage: 1,
    pageSize: 4,
    totalPacks: 78
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

export const setSearchedName = (searchedName: string) => {
    return {
        type: SET_SEARCHED_NAME,
        searchedName
    }
};

const setSearchedPack = (packs: object[]) => {
    return {
        type: SET_SEARCHED_PACKS,
        packs,
    }
};

export const setPaginatorPageSize = (pageSize: number) => {
    return {
        type: SET_PAGINATOR_PAGE_SIZE,
        pageSize,
    }
};

export const setPaginatorCurrentPage = (currentPage: number) => {
    return {
        type: SET_PAGINATOR_CURRENT_PAGE,
        currentPage,
    }
};


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
        case SET_SEARCHED_NAME:
            return {
                ...state,
                searchedName: action.searchedName
            };
        case SET_SEARCHED_PACKS:
            return {
                ...state,
                tables: [...action.packs]
            };
        case SET_PAGINATOR_PAGE_SIZE:
            return {
                ...state,
                pageSize: action.pageSize
            };
        case SET_PAGINATOR_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            };
        default:
            return state
    }
}

export const searchNameTH = (deckName: string) => {
    return async (dispatch: any) => {
        try {
            const response = await tablesAPI.getSearchedDeck(deckName);
            document.cookie = `${response.data.token}; max-age=3600`;
            dispatch(setSearchedPack(response.data.cardPacks));
        } catch (e) {

        }
    }
};

export const paginatorTH = (currentPage: number, pageSize: number) => {
    return async (dispatch: any) => {
        try {
            const response = await tablesAPI.setPaginatorSettings(pageSize, currentPage);
            document.cookie = `${response.data.token}; max-age=3600`;
            dispatch(setSearchedPack(response.data.cardPacks));
        } catch (e) {

        }
    }
};

export const ascendingSortHandlerSortByNameTH = (pageCount: number, currentPage: number) => {
    return async (dispatch: any) => {
        try {
            //const {pageCount, currentPage} = useSelector((store: storeType) => store.tables);
            const response = await tablesAPI.ascendingSortByName(pageCount , currentPage);
            document.cookie = `${response.data.token}; max-age=3600`;
            dispatch(setSearchedPack(response.data.cardPacks));
        } catch (e) {

        }
    }
};

export const descendingSortByNameTH = (pageCount: number, currentPage: number) => {
    return async (dispatch: any) => {
        try {
            //const {pageCount, currentPage} = useSelector((store: storeType) => store.tables);
            const response = await tablesAPI.descendingSortByName(pageCount , currentPage);
            document.cookie = `${response.data.token}; max-age=3600`;
            dispatch(setSearchedPack(response.data.cardPacks));
        } catch (e) {

        }
    }
};


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
