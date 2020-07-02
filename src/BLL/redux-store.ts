import {createStore, combineReducers, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk"
import {loginReducer} from "./login-reducer";
import { reducer as formReducer } from 'redux-form'
import {forgotReducer} from "../components/4_Forgot/bll/forgot-reducer";
import { registerReducer } from "../components/3_Registration/2_bll/registerReducer";



let reducers = combineReducers({
    login: loginReducer,
    form: formReducer,
    register: registerReducer,
    forgot: forgotReducer
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware));
export default store;
// @ts-ignore
window.store = store;

export type storeType = ReturnType<typeof reducers>

