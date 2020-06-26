
export type initialStateType = typeof initialState

const initialState = {
    text: ''
}


export const loginReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        default:
            return state
    }

}