import {forgotAPI} from "../dal/ForgotAPI";

export type initialStateType = typeof initialState

const initialState = {
    email: '',
    emailSent: null,
    isLoading: false,
    showMessage: false,
    message: ''
}

export const emailSendSuccess = (ans: any) => {
    return {type: "EMAIL_SENT", emailSent: true}
}

export const sendEmailWithError = () => {
    console.log('все плохо')
    return {type: "EMAIL_SENT", emailSent: false}
}

export const showMessageToggle = (toggle: boolean, message: string) => {
    return {type: "TOGGLE_MESSAGE", toggle, message}
}

export const loadingInProcess = (loadingToggle: boolean) => {
    return {type: "LOADING_IN_PROCESS", loadingToggle}
}

export const forgotReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case "SET_EMAIL":
            return {
                ...state,
                email: action.email
            };
        case "EMAIL_SENT":
            return {
                ...state,
                emailSent: action.emailSent,
                showMessage: true
            };
        case "TOGGLE_MESSAGE":
            return {
                ...state,
                showMessage: action.toggle,
                message: action.message
            };
        case "LOADING_IN_PROCESS":
            return {
                ...state,
                isLoading: action.loadingToggle
            };
        default:
            return state
    }
}

export const forgotPassTH = (email: string) => {
    return async (dispatch: any) => {
        dispatch(loadingInProcess(true))
        try {
            const ans = await forgotAPI.forgotPass(email)
            dispatch(emailSendSuccess(ans))
        } catch (e) {
            dispatch(sendEmailWithError())
        } finally {
            dispatch(loadingInProcess(false))
        }

    }
};