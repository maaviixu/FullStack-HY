import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter(state, action) {
            console.log(action.payload)
            return action.payload
        },
        resetFilter(state, action) {
            return ''
        }
    }
})

export const { setFilter, resetFilter } = filterSlice.actions
export default filterSlice.reducer