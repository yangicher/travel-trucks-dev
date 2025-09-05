import CampersFilters from '../CampersFilters/CampersFilters'
import CampersList from '../CampersList/CampersList'
import css from './Campers.module.css'

function Campers() {
    return (
        <div className={css.campers}>
            <CampersFilters/>
            <CampersList/>
        </div>
    )
}

export default Campers