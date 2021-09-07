import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../actions";
import ButtonBar from "../ButtonBar/ButtonBar";

const Home = () => {
  const countries = useSelector((state) => state.countries);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!countries.length) {
  //     dispatch(getCountries("countries", 1));
  //   }
  // }, []);

  return (
    <>
      <ButtonBar />
    </>
  );
};

export default Home;

