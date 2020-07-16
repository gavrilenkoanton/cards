import {createStore, combineReducers, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk"
import {loginReducer} from "./login-reducer";
import {forgotReducer} from "../components/4_Forgot/bll/forgot-reducer";
import { registerReducer } from "../components/3_Registration/2_bll/registerReducer";
import {tablesReducer} from "../components/5_Tables/bll/tables-reducer";
import {deckReducer} from "../components/6_Deck/bll/deck-reducer";



let reducers = combineReducers({
    login: loginReducer,
    register: registerReducer,
    forgot: forgotReducer,
    tables: tablesReducer,
    deck: deckReducer
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));
export default store;


export type storeType = ReturnType<typeof reducers>

