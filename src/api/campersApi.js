import axios from "axios"

const baseUrl = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers'
const campersPerPage = 4

export const campersForms = ['panelTruck', 'fullyIntegrated', 'alcove']

function prepareParams(pageNumber, filters) {
    const params = {
        limit: campersPerPage,
        page: pageNumber,
    }

    // add location filter if setted
    if (filters.location !== '')
        params.location = filters.location

    // add Vehicle type if it setted and has correct value
    if (filters.form !== '' && campersForms.indexOf(filters.form) >= 0)
        params.form = filters.form

    // add Vehicle equipment if setted
    Object.keys(filters.equipments).forEach((key) => {
        if (filters.equipments[key]) {
            // hook for automatic transmission type
            if (key == 'automatic')
                params['transmission'] = 'automatic'
            else
                params[key] = true
        }
    })

    return params
}

export const getCampersPage = async (pageNumber, filters) => {
    const {data} = await axios.get(baseUrl, {params: prepareParams(pageNumber, filters)})
    return data
}

export const getCamper = async (id) => {
    const {data} = await axios.get(`${baseUrl}/${id}`)
    return data
}
