import {tablesAPI} from "../dal/TablesAPI";
import {storeType} from "../../../BLL/redux-store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";


const SET_TABLES = 'SET_TABLES';
const ADD_NEW_DECK = 'ADD_NEW_DECK';
const DELETE_DECK = 'DELETE_DECK';
const RENAME_DECK = 'RENAME_DECK';
const LOADING_TABLES = 'LOADING_TABLES';
const SET_SEARCHED_NAME = 'SET_SEARCHED_NAME';
const SET_SEARCHED_PACKS = 'SET_SEARCHED_PACKS';
const SET_PAGINATOR_PAGE_SIZE = 'SET_PAGINATOR_PAGE_SIZE';
const SET_PAGINATOR_CURRENT_PAGE = "SET_PAGINATOR_CURRENT_PAGE";
const SET_TOTAL_PACKS = "SET_TOTAL_PACKS";
const LOADING_RENAME_TOGGLE = "LOADING_RENAME_TOGGLE";

export type initialStateType = {
    loadingTables: boolean
    tables: Array<object>
    searchedName: string,
    currentPage: number,
    pageSize: number,
    totalPacks: number
}

const initialState = {
    loadingTables: false,
    tables: [{name: "first", _id: 1, loading: false}, {name: "second", _id: 2}, {name: "third", _id: 3}],
    searchedName: '',
    currentPage: 1,
    pageSize: 4,
    totalPacks: 78
};

type getTablesSuccessType = {
    type: typeof SET_TABLES,
    ans: object
}

type addDeckSuccess = {
    type: typeof ADD_NEW_DECK,
    ans: object
}

type deleteDeckSuccess = {
    type: typeof DELETE_DECK,
    ans: string
}

type renameDeckSuccess = {
    type: typeof RENAME_DECK,
    ans: object
}

type loadingToggleACType = {
    type: typeof LOADING_TABLES,
    toggle: boolean
}
type loadingRenameToggleACType = {
    type: typeof LOADING_RENAME_TOGGLE,
    id: string,
    toggle: boolean
}

type setSearchedNameType = {
    type: typeof SET_SEARCHED_NAME,
    searchedName: string
}

type setSearchedPackType = {
    type: typeof SET_SEARCHED_PACKS,
    packs: Array<object>
}

type setPaginatorPageSizeType = {
    type: typeof SET_PAGINATOR_PAGE_SIZE,
    pageSize: number
}

type setPaginatorCurrentPageType = {
    type: typeof SET_PAGINATOR_CURRENT_PAGE,
    currentPage: number
}

type setTotalPacks = {
    type: typeof SET_PAGINATOR_CURRENT_PAGE,
    totalPacks: number
}

export const getTablesSuccess = (ans: object): getTablesSuccessType => {
    return {type: SET_TABLES, ans}
}
export const addDeckSuccess = (ans: object): addDeckSuccess => {
    return {type: ADD_NEW_DECK, ans}
}
export const deleteDeckSuccess = (ans: string): deleteDeckSuccess => {
    return {type: DELETE_DECK, ans}
}
export const renameDeckSuccess = (ans: object): renameDeckSuccess => {
    return {type: RENAME_DECK, ans}
}
export const loadingToggleAC = (toggle: boolean): loadingToggleACType => {
    return {type: LOADING_TABLES, toggle}
}
export const loadingRenameToggleAC = (id: string, toggle: boolean): loadingRenameToggleACType => {
    return {type: LOADING_RENAME_TOGGLE, id, toggle}
}

export const setSearchedName = (searchedName: string): setSearchedNameType => {
    return {
        type: SET_SEARCHED_NAME,
        searchedName
    }
};

const setSearchedPack = (packs: Array<object>): setSearchedPackType => {
    return {
        type: SET_SEARCHED_PACKS,
        packs
    }
};

export const setPaginatorPageSize = (pageSize: number): setPaginatorPageSizeType => {
    return {
        type: SET_PAGINATOR_PAGE_SIZE,
        pageSize,
    }
};

export const setPaginatorCurrentPage = (currentPage: number): setPaginatorCurrentPageType => {
    return {
        type: SET_PAGINATOR_CURRENT_PAGE,
        currentPage
    }
};

const setTotalPacks = (totalPacks: number): setTotalPacks => {
    return {
        type: SET_PAGINATOR_CURRENT_PAGE,
        totalPacks,
    }
};

type actionTypes =
    getTablesSuccessType
    | addDeckSuccess
    | deleteDeckSuccess
    | renameDeckSuccess
    | loadingToggleACType
    | loadingRenameToggleACType
    | setSearchedNameType
    | setSearchedPackType
    | setPaginatorPageSizeType
    | setPaginatorCurrentPageType
    | setTotalPacks;


export const tablesReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case LOADING_TABLES:
            return {
                ...state,
                loadingTables: action.toggle
            };
        case SET_TABLES:
            return {
                ...state,
                tables: action.ans.data.cardPacks.map((i: any) => {
                    return {...i, loading: false};
                })
            };
        case ADD_NEW_DECK:
            return {
                ...state,
                tables: [action.ans, ...state.tables].slice(0, state.pageSize)
            };
        case DELETE_DECK:
            return {
                ...state,
                tables: state.tables.filter(t => t._id !== action.ans)
            };
        case LOADING_RENAME_TOGGLE:
            return {
                ...state,
                tables: state.tables.map(tl => {
                    if (tl._id !== action.id) return tl;
                    else return {...tl, loading: action.toggle}
                })
            };
        case RENAME_DECK:
            return {
                ...state,
                tables: state.tables.map(tl => {
                    if (tl._id !== action.ans.data.updatedCardsPack._id) return tl;
                    else return {...tl, name: action.ans.data.updatedCardsPack.name, loading: true}
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
            if (action.currentPage)
                return {
                    ...state,
                    currentPage: action.currentPage
                };
            else
                return {
                    ...state
                };
        case SET_TOTAL_PACKS:
            return {
                ...state,
                currentPage: action.totalPacks
            };
        default:
            return state
    }
}

export const searchNameTH = (deckName: string)
    : ThunkAction<Promise<void>, storeType, unknown, actionTypes> => {
    return async (dispatch: any) => {
        dispatch(loadingToggleAC(true))
        try {
            const response = await tablesAPI.getSearchedDeck(deckName);
            document.cookie = `${response.data.token}; max-age=3600`;
            dispatch(setSearchedPack(response.data.cardPacks));
        } catch (e) {

        } finally {
            dispatch(loadingToggleAC(false))
        }
    }
};

export const ascendingSortHandlerSortByNameTH = (pageCount: number, currentPage: number)
    : ThunkAction<Promise<void>, storeType, unknown, actionTypes> => {
    return async (dispatch: ThunkDispatch<storeType, unknown, actionTypes>) => {
        dispatch(loadingToggleAC(true))
        try {
            const response = await tablesAPI.ascendingSortByName(pageCount, currentPage);
            document.cookie = `${response.data.token}; max-age=3600`;
            dispatch(setSearchedPack(response.data.cardPacks));
        } catch (e) {

        } finally {
            dispatch(loadingToggleAC(false))
        }
    }
};

export const descendingSortByNameTH = (pageCount: number, currentPage: number)
    : ThunkAction<Promise<void>, storeType, unknown, actionTypes> => {
    return async (dispatch: ThunkDispatch<storeType, unknown, actionTypes>) => {
        dispatch(loadingToggleAC(true))
        try {
            const response = await tablesAPI.descendingSortByName(pageCount, currentPage);
            document.cookie = `${response.data.token}; max-age=3600`;
            dispatch(setSearchedPack(response.data.cardPacks));
        } catch (e) {

        } finally {
            dispatch(loadingToggleAC(false))
        }
    }
};


export const getTablesTH = (pageSize: number, currentPage: number)
    : ThunkAction<Promise<void>, storeType, unknown, actionTypes> => {
    return async (dispatch: ThunkDispatch<storeType, unknown, actionTypes>) => {
        dispatch(loadingToggleAC(true))
        try {
            const ans = await tablesAPI.getTables(pageSize, currentPage);
            document.cookie = `${ans.data.token}; max-age=3600`;
            dispatch(getTablesSuccess(ans));
            dispatch(setTotalPacks(ans.data.cardPacksTotalCount));
        } catch (e) {

        } finally {
            dispatch(loadingToggleAC(false))
        }
    }
};
export const addNewDeckTH = (newDeckName: string)
    : ThunkAction<Promise<void>, storeType, unknown, actionTypes> => {
    return async (dispatch: ThunkDispatch<storeType, unknown, actionTypes>) => {
        try {
            const ans = await tablesAPI.addNewDeck(newDeckName)
            document.cookie = `${ans.data.token}; max-age=3600`;
            dispatch(addDeckSuccess(ans.data.newCardsPack))
        } catch (e) {

        } finally {

        }
    }
};
export const deleteDeckTH = (id: string): ThunkAction<Promise<void>, storeType, unknown, actionTypes> => {
    return async (dispatch: ThunkDispatch<storeType, unknown, actionTypes>) => {
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
export const changeDeckNameTH = (newName: string, id: string)
    : ThunkAction<Promise<void>, storeType, unknown, actionTypes> => {
    return async (dispatch: ThunkDispatch<storeType, unknown, actionTypes>) => {
        dispatch(loadingRenameToggleAC(id, true))
        try {
            const ans = await tablesAPI.changeDeckName(newName, id)
            document.cookie = `${ans.data.token}; max-age=3600`;
            dispatch(renameDeckSuccess(ans))
        } catch (e) {

        } finally {
            dispatch(loadingRenameToggleAC(id, false))
        }
    }
};
