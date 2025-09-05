import {useNavigate} from 'react-router-dom'
import css from './LinkButton.module.css'

function LinkButton({to = '/', newWindow = false, children = 'link'}) {
    const navigate = useNavigate();

    function handleClick() {
        if (newWindow)
            window.open(to, '_blank')
        else
            navigate(to)
    }

    return (
        <>
            <button className={css.button} onClick={handleClick}>{children}</button>
        </>
    )
}

export default LinkButton