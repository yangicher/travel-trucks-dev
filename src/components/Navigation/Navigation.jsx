import { NavLink } from "react-router-dom";
import Icon from "../../../public/icons/Icon.jsx";
import css from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={css.nav}>
      <div className={css.logoContainer}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${css.link} ${css.activeLink}` : css.link
          }
        >
          <Icon
            name="icon-logo"
            width={136}
            height={16}
            className={css.logo}
          />
        </NavLink>
      </div>
      <div className={css.wrapper}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${css.link} ${css.activeLink}` : css.link
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/catalog"
          className={({ isActive }) =>
            isActive ? `${css.link} ${css.activeLink}` : css.link
          }
        >
          Catalog
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
