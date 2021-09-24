import React from "react";
import style from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={style.navbar}>
      <h1 className={style.title}>
        countries<span className={style.titleSpan}>.</span>
      </h1>
    </div>
  );
};

export default NavBar;
