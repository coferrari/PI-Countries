import React from "react";
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <>
      // LOGO

      <Link to="/createactivity">Create activity</Link>
      <Link to="/activities">// GO TO ACTIVITIES</Link>
      
    </>
  );
};

export default NavBar;
