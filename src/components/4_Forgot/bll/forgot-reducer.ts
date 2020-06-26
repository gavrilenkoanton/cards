
export type initialStateType = typeof initialState

const initialState = {
    email: 'empty@gmail.com'
}


export const forgotReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case "SET_EMAIL":
       return  {
           ...state,
           email: action.email
        };
        default:
            return state
    }

}