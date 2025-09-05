import css from './Loader.module.css'
import ClipLoader from "react-spinners/ClipLoader";

function Loading() {
    return (
        <div className={css.loader}>
            <ClipLoader color="#36d7b7" size={50} />
        </div>
    )
}

export default Loading