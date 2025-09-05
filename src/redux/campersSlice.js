import {createSlice} from '@reduxjs/toolkit';
import md5 from "md5"

import {fetchCampers} from './campersOps';
import {initialFiltersState} from './filterSlice';

export const generateMD5 = (obj) => md5(JSON.stringify(obj))

const initialCampersState = {
    items: [],
    total_items: 0,
    page: 1,
    loading: false,
    error: false,
    filtersMD5: generateMD5(initialFiltersState)
}

const slice = createSlice({
    name: "campers",
    initialState: initialCampersState,
    reducers: {
        setNewFiltersMD5(state, action) {
            state.items = []
            state.total_items = 0
            state.page = 1
            state.filtersMD5 = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCampers.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(fetchCampers.fulfilled, (state, {payload}) => {
                if (payload.append) {
                    state.items = state.items.concat(payload.items)
                    state.page += 1
                } else {
                    state.items = payload.items
                    state.page = 1
                }
                state.total_items = payload.total
                state.loading = false
                state.error = false
            })
            .addCase(fetchCampers.rejected, (state, {error}) => {
                state.loading = false
                state.error = error.message
            })
    },
    selectors: {
        selectCampers: (state) => state.items,
        selectCampersHaveMore: (state) => state.total_items > state.items.length,
        selectCampersLoading: (state) => state.loading,
        selectCampersError: (state) => state.error,
        selectFiltersMD5: (state) => state.filtersMD5,
    }
})

export const {setNewFiltersMD5} = slice.actions
export const {
    selectCampers,
    selectCampersHaveMore,
    selectCampersLoading,
    selectCampersError,
    selectFiltersMD5
} = slice.selectors

export default slice.reducer