import {createStore, combineReducers, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk"
import {loginReducer} from "./login-reducer";
import { registerReducer } from "./register-reducer";
import {forgotReducer} from "../components/4_Forgot/bll/forgot-reducer";



let reducers = combineReducers({
    login: loginReducer,
    register: registerReducer,
    forgot: forgotReducer
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware));
export default store;

