import {RegisterAPI} from "../3_dal/RegistrationApi";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {storeType} from "../../../BLL/redux-store";

export type initialStateType = {
    loading: boolean,
    success: boolean,
    error: string,
}

const initialState: initialStateType = {
    loading: false,
    success: false,
    error: ''
};

export const registerReducer = (state = initialState, action: actionTypes): initialStateType => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: action.loading,
            };

        case SET_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.success,
                error: ''
            };

        case SET_ERROR:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.error
            };

        default:
            return state
    }
};

const SET_SUCCESS = 'SET_SUCCESS';
const SET_ERROR = 'SET_ERROR';
const SET_LOADING = 'SET_LOADING';

type actionTypes = setSuccessAction | setErrorAction | setLoadingAction;

type setSuccessAction = {
    type: typeof SET_SUCCESS,
    success: boolean
};

type setErrorAction = {
    type: typeof SET_ERROR,
    error: string
};

type setLoadingAction = {
    type: typeof SET_LOADING,
    loading: boolean
};

const setSuccessAC = (success: boolean): setSuccessAction => ({
    type: SET_SUCCESS,
    success
});

const setErrorAC = (error: string): setErrorAction => ({
    type: SET_ERROR,
    error
});

const setLoadingAC = (loading: boolean): setLoadingAction => ({
    type: SET_LOADING,
    loading
});

export const registerThunk = (email: string, password: string, confirmedPassword: string)
    : ThunkAction<Promise<void>, storeType, unknown, actionTypes> => {
    return async (dispatch: ThunkDispatch<storeType, unknown, actionTypes>) => {
        dispatch(setLoadingAC(true));
        if (password !== confirmedPassword)
            dispatch(setErrorAC('Password is not match'));
        else if(email === '' || password === '' || confirmedPassword === '')
            dispatch(setErrorAC('All field is required!'));
        else if(password.length<=7 || confirmedPassword.length<=7)
            dispatch(setErrorAC('password must be more than 7 char!'));
        else if(!email.match(/^[\w][\w-.]*@[\w-]+\.[a-z]{2,7}$/i))
            dispatch(setErrorAC('Email is not valid!'));
        else {
            try {
                await RegisterAPI.register(email, password);
                dispatch(setSuccessAC(true));
            } catch (e) {
                debugger
                const err = e.response.data.error;
                dispatch(setErrorAC(err))
            }
        }
    }
};


