import {NavLink} from 'react-router-dom'
import logo from '../../assets/logo.svg'
import css from './Header.module.css'

function Header() {
    const getActiveClass = ({isActive}) => {
        return css.link + ' ' + (isActive ? css.active : '')
    }

    return (
        <header className={css.header}>
            <div className={`container ${css.container}`}>
                <div className={css.logo}>
                    <img src={logo} alt="TravelTrucks"/>
                </div>
                <div className={css.nav}>
                    <NavLink to="/" className={getActiveClass}>Home</NavLink>
                    <NavLink to="/catalog" className={getActiveClass}>Catalog</NavLink>
                </div>
            </div>
        </header>
    )
}

export default Header