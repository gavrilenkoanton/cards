import {createStore, combineReducers, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk"
import {loginReducer} from "./login-reducer";
import { registerReducer } from "./register-reducer";



let reducers = combineReducers({
    login: loginReducer,
    register: registerReducer
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware));
export default store;

