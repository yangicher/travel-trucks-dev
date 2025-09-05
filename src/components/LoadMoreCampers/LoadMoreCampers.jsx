import {useDispatch, useSelector} from 'react-redux'
import {selectCampersHaveMore, selectCampersLoading} from '../../redux/campersSlice'
import {fetchCampers} from '../../redux/campersOps'

import Loading from '../Loader/Loading.jsx'
import css from './LoadMoreCampers.module.css'

function LoadMoreCampers() {
    const dispatch = useDispatch()
    const campersListHaveMore = useSelector(selectCampersHaveMore)
    const campersListLoading = useSelector(selectCampersLoading)

    function handleLoadMore() {
        dispatch(fetchCampers(true))
    }

    return (
        <div className={css.container}>
            {campersListLoading && <Loading/>}
            {!campersListLoading && campersListHaveMore &&
                <button className={css.button} onClick={handleLoadMore}>Load more</button>}
        </div>
    )
}

export default LoadMoreCampers