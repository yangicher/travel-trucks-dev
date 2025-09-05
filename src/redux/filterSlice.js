import {createSlice} from '@reduxjs/toolkit';

export const initialFiltersState = {
    location: '',
    form: '',
    equipments: {
        AC: false,
        automatic: false,
        bathroom: false,
        kitchen: false,
        TV: false,
    }
}

const slice = createSlice({
    name: "filters",
    initialState: initialFiltersState,
    reducers: {
        changeFilters(state, action) {
            state.location = action.payload.location
            state.form = action.payload.form
            state.equipments = {...action.payload.equipments}
        }
    },
    selectors: {
        selectLocationFilter: (state) => state.location,
        selectFormFilter: (state) => state.form,
        selectEquipmentsFilters: (state) => state.equipments,
    }
})

export const {changeFilters} = slice.actions
export const {selectLocationFilter, selectFormFilter, selectEquipmentsFilters} = slice.selectors

export default slice.reducer