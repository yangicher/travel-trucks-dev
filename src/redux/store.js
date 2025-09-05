import {configureStore} from '@reduxjs/toolkit'
import {persistStore} from 'redux-persist';
import filtersReducer from './filterSlice'
import campersReducer from './campersSlice'
import favoritesReducer from './favoritesSlice.js'

export const store = configureStore({
    reducer: {
        filters: filtersReducer,
        campers: campersReducer,
        favorites: favoritesReducer,
    }
})

export const persistor = persistStore(store)
