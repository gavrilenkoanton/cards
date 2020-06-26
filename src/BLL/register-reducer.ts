

export type initialStateType = typeof initialState

const initialState = {
    text: ''
}


export const registerReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        default:
            return state
    }

}