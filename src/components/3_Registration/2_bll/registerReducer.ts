import {RegisterAPI} from "../3_dal/RegistrationApi";
import {Dispatch} from "redux";
import { ThunkAction } from "redux-thunk";
import {storeType} from "../../../BLL/redux-store";

export type initialStateType = {
    //  loading: boolean,
    success: boolean,
    error: string,
}

const initialState: initialStateType = {
    //  loading: false,
    success: false,
    error: ''
};

export const registerReducer = (state = initialState, action: actionTypes): initialStateType => {
    switch (action.type) {
        /*case 'SET_LOADING':
            return {
                ...state,
                //   loading: action.loading,
                success: false,
                error: ''
            };*/

        case 'SET_SUCCESS':
            return {
                ...state,
                // loading: false,
                success: action.success,
                error: ''
            };

        case 'SET_ERROR':
            return {
                ...state,
                // loading: false,
                success: false,
                error: action.error
            };

        default:
            return state
    }
};

const SET_SUCCESS = 'SET_SUCCESS';
const SET_ERROR = 'SET_ERROR';

type actionTypes = setSuccessAction | setErrorAction;

type setSuccessAction = {
    type: typeof SET_SUCCESS,
    success: boolean
};

type setErrorAction = {
    type: typeof SET_ERROR,
    error: string
}

const setSuccessAC = (success: boolean): setSuccessAction => ({
        type: SET_SUCCESS,
        success
});

const setErrorAC = (error: string): setErrorAction => ({
        type: 'SET_ERROR',
        error
});

export const registerThunk = (email: string, password: string, confirmedPassword: string)
    :ThunkAction<Promise<void>, storeType, unknown, actionTypes>=>{
    return async (dispatch: any) => {
        if (password !== confirmedPassword)
            dispatch(setErrorAC('Password is not match'));
        else {
            try{
                await RegisterAPI.register(email, password);
                dispatch(setSuccessAC(true));
            }
            catch (e) {
                const err = e.response.data.error;
                dispatch(setErrorAC(err))
            }
        }
    }
};


