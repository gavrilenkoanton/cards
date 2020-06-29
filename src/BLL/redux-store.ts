import {createStore, combineReducers, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk"
import {loginReducer} from "./login-reducer";
import { registerReducer } from "./register-reducer";
import { reducer as formReducer } from 'redux-form'



let reducers = combineReducers({
    login: loginReducer,
    form: formReducer,
    register: registerReducer
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware));



export default store;
// @ts-ignore
window.store = store;

