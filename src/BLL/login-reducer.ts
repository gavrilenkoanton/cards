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
        debugger
        const auth = await AuthorizationAPI.login(email, password, rememberMe)
        console.log(auth)
    }
    catch (err) {
        debugger
        console.log(err)
    }
}

export const LogOutThunk = () => (dispatch: any) => {
    AuthorizationAPI.logOut()
        .then(response => {
            if (response.data.resultCode) {
                console.log("logOut success");
            }
        });
};


export default loginReducer;