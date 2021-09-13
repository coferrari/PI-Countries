import React from "react";
import { NavLink } from "react-router-dom";
import world from "../../img/world.jpeg";
import style from "./LangingPage.module.css";

const LandingPage = () => {
  return (
    <>
      <div className={style.bgImg}>
        <img src={world} className={style.imgSize}/>
      </div>
      <div className={style.background}>
        <NavLink to="/home/countries" className={style.link}>
          <h2 className={style.h2}>Explore the world!</h2>
        </NavLink>
      </div>
    </>
  );
};

export default LandingPage;
