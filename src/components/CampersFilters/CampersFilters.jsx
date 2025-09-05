import {useId, useState} from "react"
import {useDispatch, useSelector} from 'react-redux'
import {changeFilters, selectEquipmentsFilters, selectFormFilter, selectLocationFilter} from '../../redux/filterSlice'
import {generateMD5, selectFiltersMD5, setNewFiltersMD5} from "../../redux/campersSlice"
import {campersForms} from "../../api/campersApi.js"
import {fetchCampers} from '../../redux/campersOps'

import icons from '../../assets/icons.svg'
import cssButton from '../LinkButton/LinkButton.module.css'
import css from './CampersFilters.module.css'

function CampersFilters() {
    const dispatch = useDispatch()

    const curFiltersMD5 = useSelector(selectFiltersMD5)
    const [locationFilter, changeLocation] = useState(useSelector(selectLocationFilter))
    const [formFilter, changeForm] = useState(useSelector(selectFormFilter))
    const [equipmentsFilter, changeEquipments] = useState(useSelector(selectEquipmentsFilters))

    const locationId = useId()
    const equipId = useId()
    const formId = useId()

    function handleFormSubmit(e) {
        e.preventDefault()
        const newFilters = {
            location: locationFilter,
            form: formFilter,
            equipments: {...equipmentsFilter}
        }
        const newFiltersMD5 = generateMD5(newFilters)
        if (newFiltersMD5 !== curFiltersMD5) {
            // new filter not equal to old - dispatch it
            dispatch(changeFilters(newFilters))
            dispatch(setNewFiltersMD5(newFiltersMD5))
            // re-read the campers from first page
            dispatch(fetchCampers(false))
        }
    }

    function handleLocationChanged(e) {
        const value = e.target.value
        changeLocation(value)
    }

    function handleEquipmentChecked(e) {
        changeEquipments({
            ...equipmentsFilter,
            [e.target.name]: !equipmentsFilter[e.target.name]
        })
    }

    function handleFormChange(e) {
        changeForm(e.target.value === formFilter ? '' : e.target.value)
    }

    const equipmentsSVG = {
        AC: 'icon-wind',
        automatic: 'icon-transmission',
        bathroom: 'icon-bathroom',
        kitchen: 'icon-kitchen',
        TV: 'icon-tv',
    }
    const typeSVG = {
        panelTruck: ['Van', 'icon-type-van'],
        fullyIntegrated: ['Fully Integrated', 'icon-type-fully'],
        alcove: ['Alcove', 'icon-type-alcove'],
    }
    return (
        <div className={css.filters}>
            <form onSubmit={handleFormSubmit}>
                <div className={css.location}>
                    <label htmlFor={locationId}>Location</label>
                    <div className={css.locationWraper}>
                        <svg className={css.locationIcon}>
                            <use xlinkHref={`${icons}#icon-map`}/>
                        </svg>
                        <input type="text" name="location" className={css.locationInput} value={locationFilter}
                               id={locationId} onChange={handleLocationChanged} placeholder="City"/>
                    </div>
                </div>
                <label>Filters</label>
                <div className={css.filter}>
                    <h3>Vehicle equipment</h3>
                    <ul>
                        {Object.keys(equipmentsFilter).map((key) => {
                            const myId = `${equipId}${key}`
                            return (
                                <li key={myId}>
                                    <input type="checkbox" name={key} className={css.fltrInput}
                                           checked={equipmentsFilter[key]} id={myId} onChange={handleEquipmentChecked}/>
                                    <label htmlFor={myId} className={css.fltrLabel}>
                                        <svg>
                                            <use xlinkHref={`${icons}#${equipmentsSVG[key]}`}/>
                                        </svg>
                                        {key}
                                    </label>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className={css.filter}>
                    <h3>Vehicle type</h3>
                    <ul>
                        {campersForms.map((itm) => {
                            const myId = `${formId}${itm}`
                            return (
                                <li key={myId}>
                                    <input type="radio" name="form" className={css.fltrInput} id={myId} value={itm}
                                           checked={itm == formFilter} onClick={handleFormChange}
                                           onChange={handleFormChange}/>
                                    <label htmlFor={myId} className={css.fltrLabel}>
                                        <svg>
                                            <use xlinkHref={`${icons}#${typeSVG[itm][1]}`}/>
                                        </svg>
                                        {typeSVG[itm][0]}
                                    </label>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <button type="submit" className={cssButton.button}>Search</button>
            </form>
        </div>
    )
}

export default CampersFilters