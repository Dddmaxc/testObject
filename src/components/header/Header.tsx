import { useEffect, useState } from "react";
import style from "./Header.module.css";
import logo from "../../assets/logo.png";
import clock from "../../assets/wall-clock.svg";
import { TopMenu } from "./topMenu/TopMenu";

export const Header = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const day = now.getDate();
      const month = now
        .toLocaleString("en-US", { month: "short" })
        .toUpperCase();
      const year = now.getFullYear();
      setCurrentDate(`${day} ${month}, ${year}`);
    };

    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateDate();
    updateTime();

    const dateInterval = setInterval(updateDate, 60000);
    const timeInterval = setInterval(updateTime, 1000);

    return () => {
      clearInterval(dateInterval);
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <header className={style.header}>
      <div className={style.header__container}>
        <div className={style.left}>
          <div className={style.left_container}>
            <img className={style.logo} src={logo} alt="logo" />
            <span>INVENTORY</span>
          </div>

          <div className={style.center}>
            <input
              type="text"
              placeholder="Поиск..."
              className={style.search__input}
            />
          </div>
          <span>
            <TopMenu />
          </span>
        </div>

        <div className={style.right}>
          <div className={style.data_container}>today</div>
          <div className={style.data_container_allDate}>
            <span>{currentDate}</span>
            <div>
              <img
                className={style.clockIcon}
                src={clock}
                alt="clock"
                width={12}
                height={12}
              />
              <span>{currentTime}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
