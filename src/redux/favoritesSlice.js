import {createSlice} from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'

const slice = createSlice({
    name: "favorites",
    initialState: {
        campers: []
    },
    reducers: {
        addFavoriteCamper(state, action) {
            if (state.campers.indexOf(action.payload) < 0)
                state.campers.push(action.payload)
        },
        deleteFavoriteCamper(state, action) {
            return {
                ...state,
                campers: state.campers.filter((id) => id !== action.payload)
            }
        }
    },
    selectors: {
        selectFavorites: (state) => state.campers,
        selectIsFavorites: (state, id) => state.campers.indexOf(id) >= 0
    }
})

export const {addFavoriteCamper, deleteFavoriteCamper} = slice.actions
export const {selectFavorites, selectIsFavorites} = slice.selectors

const persistConfig = {
    key: 'favoritesCampers',
    storage,
}

export default persistReducer(persistConfig, slice.reducer)
