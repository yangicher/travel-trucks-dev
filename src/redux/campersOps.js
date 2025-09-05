import {createAsyncThunk} from '@reduxjs/toolkit'
import {getCampersPage} from '../api/campersApi.js'

export const fetchCampers = createAsyncThunk('campers/fetch', async (nextPage, thunkAPI) => {
    try {
        const state = thunkAPI.getState()

        // if have more data - can load more
        let pageNumber = state.campers.page;
        if (nextPage) {
            if (state.campers.total_items > state.campers.items.length)
                pageNumber += 1
            else
                return thunkAPI.rejectWithValue('No more data for loading...')
        } else // reload from first page
            pageNumber = 1

        const data = await getCampersPage(pageNumber, state.filters)
        data.append = nextPage
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})