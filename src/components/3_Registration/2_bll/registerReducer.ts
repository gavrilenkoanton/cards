import {RegisterAPI} from "../3_dal/RegistrationApi";

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

export const registerReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case 'SET_LOADING':
            return {
                ...state,
                //   loading: action.loading,
                success: false,
                error: ''
            };

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

const setSuccessAC = (success: boolean) => {
    return {
        type: 'SET_SUCCESS',
        success
    }
};

const setErrorAC = (error: string) => {
    return {
        type: 'SET_ERROR',
        error
    }
};

export const registerThunk = (email: string, password: string, confirmedPassword: string) =>
    (dispatch: any) => {
        if (password !== confirmedPassword)
            dispatch(setErrorAC('Password is not match'));
        else {
            RegisterAPI.register(email, password)
                .then((res)=>{
                    debugger
                    console.log(res);
                    dispatch(setSuccessAC(true))
                },(error)=>{
                    const err = error.response.data.error;
                    dispatch(setErrorAC(err));
                })

                   /* if (response.data.error)
                        dispatch(setErrorAC(response.data.error));
                    else
                        dispatch(setSuccessAC(true))*/

        }
};


