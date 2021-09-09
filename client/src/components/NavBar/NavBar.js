import React from "react";
import style from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { orderCountries } from "../../actions/index";

const NavBar = () => {

  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(orderCountries('AtoZ', 0))
  }
  return (
    <div className={style.navbar}>
      <Link to="/home/countries" onClick={() => handleClick()} className={style.linkStyle}>
        <h1 className={style.title}>countries</h1>
      </Link>
    </div>
  );
};

export default NavBar;
