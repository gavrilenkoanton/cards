import {forgotAPI} from "../dal/ForgotAPI";

export type initialStateType = typeof initialState

const initialState = {
    email: '',
    emailSended: null
}

export const emailSendSuccess = (ans: any) => {
    console.log('Все норм, мыло ушло')
    return {type: "EMAIL_SEND", emailSended: true}

}
export const sendEmailWithError = () => {
    debugger
    console.log('все плохо')
    return {type: "EMAIL_SEND", emailSended: false}
}

export const forgotReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case "SET_EMAIL":
            return {
                ...state,
                email: action.email
            };
        case "EMAIL_SEND":
            debugger
            return {
                ...state,
                emailSended: action.emailSended
            }

        default:
            return state
    }
}

export const forgotPassTH = (email: string) => {
    return async (dispatch: any) => {
        try {
           const ans =  await forgotAPI.forgotPass(email)
            dispatch(emailSendSuccess(ans))
        } catch (e) {
            dispatch(sendEmailWithError())
        }
    }
};