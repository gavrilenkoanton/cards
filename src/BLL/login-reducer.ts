import {AuthorizationAPI} from "../API/api";

export type initialStateType = {
    success: boolean,
    error: string,
    isThereToken: boolean,
    email: string,
    name: string,
    userId: string
}

const initialState: initialStateType = {
    success: false,
    error: '',
    isThereToken: false,
    email: 'Почта',
    name: 'Имя',
    userId: ""
};

const SET_SUCCESS = 'SET_SUCCESS';
const SET_ERROR = 'SET_ERROR';
const SET_TOKEN = 'SET_TOKEN';

export const loginReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case SET_SUCCESS:
            return {
                ...state,
                success: action.success,
                error: ''
            };
        case "SET_ID":
            return {
                ...state,
                userId: action.ans._id
            };

        case SET_ERROR:
            return {
                ...state,
                success: false,
                error: action.error
            };
        case SET_TOKEN:
            return {
                ...state,
                isThereToken: action.isThereToken
            };
        default:
            return state
    }
};

type setSuccessAction = {
    type: typeof SET_SUCCESS,
    success: boolean
};

type setErrorAction = {
    type: typeof SET_ERROR,
    error: string
}

export const setSuccessAC = (success: boolean): setSuccessAction => {
    return {
        type: SET_SUCCESS,
        success
    }
};
export const setIdAC = (ans: any) => {
    return {
        type: "SET_ID",
        ans
    }
};

const setErrorAC = (error: string): setErrorAction => ({
    type: SET_ERROR,
    error
});

export const setTokenAC = (isThereToken: boolean) => ({
    type: SET_TOKEN,
    isThereToken
});


export const LoginThunk = (email: string | null, password: string | null, rememberMe: boolean | null) =>
    (dispatch: any) => {
        AuthorizationAPI.login(email, password, rememberMe)
            .then((response) => {
                    document.cookie = `${response.data.token}; max-age=3600`;
                    dispatch(setSuccessAC(true));
                    dispatch(setIdAC(response.data));

                },
                (e) => {
                    const err = e.response.data.error;
                    dispatch(setErrorAC(err))
                })

    };

export const authThunk = () => async (dispatch: any) => {
    try {
        const response = await AuthorizationAPI.authMe();
        dispatch(setTokenAC(true));
        dispatch(setIdAC(response.data));
        document.cookie = `${response.data.token}; max-age=3600`

    } catch (e) {
        dispatch(setTokenAC(false));
    }
};


export default loginReducer;