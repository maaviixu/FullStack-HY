import { createSlice } from "@reduxjs/toolkit"

let timeoutID

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification(state, action) {
            // console.log(action.payload)
            state = action.payload
            clearTimeout(timeoutID)
            return state
        },
        removeNotification(state, action) {
            return ''
        }
    }
})

export const notifier = (message, time) => {
    return async dispatch => {
        dispatch(setNotification(message))
        timeoutID = setTimeout(() => {dispatch(removeNotification())}, time)
    }
}

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer