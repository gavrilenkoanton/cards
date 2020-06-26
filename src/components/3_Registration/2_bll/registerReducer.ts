export type initialStateType = typeof initialState

const initialState = {
    email: 'test@gamil.com',
    password: 123456
};


export const registerReducer = (state = initialState, action: any): initialStateType => {
    debugger
    switch (action.type) {
        case 'SET_EMAIL':
            return {
                ...state,
                email: action.email
            };
        case 'SET_PASSWORD':
            return {
                ...state,
                password: action.password
            };
        default:
            return state
    }
};

export const setEmailAC = (email: string) =>{
    debugger
    return {
        type: 'SET_EMAIL',
        email
    }

};