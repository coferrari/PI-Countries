import React from "react";

const Pagination = ({ countriesPerPage, allCountries, pagination }) => {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(allCountries / countriesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <nav>
        <ul>
          {pageNumbers?.map((number) => {
            <li key={number}>
              <a onClick={() => pagination(number)}>{number}</a>
            </li>;
          })}
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
