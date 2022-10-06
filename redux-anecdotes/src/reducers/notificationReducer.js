import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification(state, action) {
            console.log(action.payload)
            return action.payload
        },
        removeNotification(state, action) {
            return ''
        }
    }
})

export const notifier = (message, time) => {
    return async dispatch => {
        dispatch(setNotification(message))
        setTimeout(() => {dispatch(removeNotification())}, time)
    }
}

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer