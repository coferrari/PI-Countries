import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCountries, filterRegion, orderCountries } from "../../actions/";
import { useLocation } from "react-router-dom";

const Pagination = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const path = pathname.split("/").pop();
  console.log(pathname);
  const totalCountries = useSelector((state) => state.countCountries);

  const totalPages = [];
  for (let i = 1; i < Math.floor(totalCountries / 9) + 1; i++) {
    totalPages.push(i);
  }

  function changePage(path, page) {
    if (pathname.includes("home")) {
      dispatch(getCountries(path, page));
    }
    // if (pathname.includes('order') && path === 'All') {
    //     console.log('aoifhASHkfas:hpHD')
    //     dispatch(getCountries('countries', 0));
    // }
    if (
      (pathname.includes("order") && path === "Africa") ||
      path === "Americas" ||
      path === "Asia" ||
      path === "Europe" ||
      path === "Oceania"
    ) {
      dispatch(filterRegion(path, page));
    }
    if (
      (pathname.includes("order") && path === "AtoZ") ||
      path === "ZtoA" ||
      path === "PopulationUp" ||
      path === "PopulationDown"
    ) {
      dispatch(orderCountries(path, page));
    }
  }

  // Custom Hooks

  // function useWindowWidth() {
  //   const [width, setWidth] = useState(window.innerWidth);
  //   useEffect(() => {
  //     const handleResize = () => setWidth(window.innerWidth)
  //     window.addEventListener('resize', handleResize)

  //     return () => {
  //       window.removeEventListener('resize', handleResize)
  //     }
  //   })
  //   return width;
  // }

  // function useDocumentTitle(title) {
  //   useEffect(() => {
  //     document.title = title
  //   },[title])
  // }

  return (
    <>
      <div style={{ display: "flex" }}>
        {totalPages &&
          totalPages.map((page) => (
            <button key={page} onClick={() => changePage(path, page - 1)}>
              {page}
            </button>
          ))}
      </div>
      <br />
      <br />
    </>
  );
};

export default Pagination;
