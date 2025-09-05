import {useEffect} from 'react'
import {useSelector} from 'react-redux'
import toast from 'react-hot-toast'
import {selectCampers, selectCampersError} from '../../redux/campersSlice'

import LoadMoreCampers from '../LoadMoreCampers/LoadMoreCampers'
import Camper from '../Camper/Camper'
import css from './CampersList.module.css'

function CampersList() {
    const campersList = useSelector(selectCampers)

    const errMsg = useSelector(selectCampersError)
    useEffect(() => {
        if (errMsg)
            toast.error(errMsg)
    }, [errMsg])

    return (
        <div className={css.list}>
            <ul>
                {campersList.map((itm) => {
                    return (<Camper key={itm.id} data={itm}/>)
                })}
            </ul>
            <LoadMoreCampers/>
        </div>
    )
}

export default CampersList
