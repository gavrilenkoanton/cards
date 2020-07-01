import {AuthorizationAPI} from "../API/api";

export type initialStateType = {
    email: string | null,
    login: string | null,
    rememberMe: boolean | null,
    isAuth: boolean | null,
}

const initialState: initialStateType = {
    email: null as string | null,
    login: null as string  | null,
    rememberMe: null as boolean | null,
    isAuth: false as boolean | null,
}


export const loginReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        default:
            return state
    }

}


export const LoginThunk = (email: string | null, password: string | null, rememberMe: boolean | null) => async (dispatch: any) => {
    try {
        const auth = await AuthorizationAPI.login(email, password, rememberMe)
        console.log(auth)
    }
    catch (err) {
        console.log(err)
    }
}


export default loginReducer;