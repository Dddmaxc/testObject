import styles from "@/app.module.css";
import user from "@/assets/currentUser.jpg";
import settings from "@/assets/setting.png";
import { PATH } from "@/routes/router";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export const NavigateMenu = () => {
  const location = useLocation();

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? `${styles["app__link"]} ${styles["app__link--active"]}`
      : styles["app__link"];

  return (
    <div className={styles["app__body"]}>
      <nav className={styles["app__nav"]}>
        <div className={styles["app__user-container"]}>
          <img className={styles["app__user"]} src={user} alt="user" />
          <Link to={PATH.SETTINGS}>
            <img
              className={styles["app__settings"]}
              src={settings}
              alt="settings"
            />
          </Link>
        </div>

        <NavLink to={PATH.PRIHOD} className={getNavLinkClass}>
          Приход
        </NavLink>
        <NavLink to={PATH.GROUPS} className={getNavLinkClass}>
          Группы
        </NavLink>
        <NavLink to={PATH.PRODUCTS} className={getNavLinkClass}>
          Продукты
        </NavLink>
        <NavLink to={PATH.USERS} className={getNavLinkClass}>
          Пользователи
        </NavLink>
        <NavLink to={PATH.SETTINGS} className={getNavLinkClass}>
          Настройки
        </NavLink>
      </nav>

      <main className={styles["app__content"]}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: .5, ease: "easeInOut" }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};
