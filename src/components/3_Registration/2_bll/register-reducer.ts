export type initialStateType = typeof initialState

const initialState = {
    email: 'test@gamil.com',
    password: 123456
};


export const registerReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case 'SET_EMAIL':
            return {
                ...state,
                email: action.payload
            };
        case 'SET_PASSWORD':
            return {
                ...state,
                password: action.payload
            };
        default:
            return state
    }

};