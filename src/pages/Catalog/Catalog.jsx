import CampersFilters from '../../components/CampersFilters/CampersFilters'
import CampersList from '../../components/CampersList/CampersList'

import css from './Catalog.module.css'

function Catalog() {
    return (
        <div className='container'>
            <div className={css.campers}>
                <CampersFilters/>
                <CampersList/>
            </div>
        </div>
    )
}

export default Catalog