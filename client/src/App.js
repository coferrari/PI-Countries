import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import NavBar from "./components/NavBar/NavBar";
import CountryDetails from "./components/CountryDetails/CountryDetails";
import Countries from "./components/Countries/Countries";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import ButtonBar from "./components/ButtonBar/ButtonBar";
import ActivityCreate from "./components/ActivityCreate/ActivityCreate";

function App() {
  return (
    <div className="App App-header">
      <BrowserRouter>
        <NavBar />
        <Route exact path="/">
          <LandingPage />
        </Route>
        {/* <Switch> */}
        <Route path="/home/countries">
          <Home />
        </Route>
        <Route exact path="/country/:alpha3code">
          <CountryDetails />
        </Route>
        <Route exact path="/activities">
          <ActivityCreate />
        </Route>
        <Route exact path="/order/:order">
          {/* <ButtonBar /> */}
          <Countries />
        </Route>
        {/* </Switch> */}
      </BrowserRouter>
    </div>
  );
}

export default App;

// VIEJO

// import "./App.css";
// import { BrowserRouter, Route, Switch } from "react-router-dom";
// import LandingPage from "./components/LandingPage/LandingPage";
// import NavBar from "./components/NavBar/NavBar";
// import CountryDetails from "./components/CountryDetails/CountryDetails";
// import Countries from "./components/Countries/Countries";
// import Footer from "./components/Footer/Footer";
// import Home from "./components/Home/Home";
// import ButtonBar from "./components/ButtonBar/ButtonBar";
// import Pagination from "./components/Pagination/Pagination";
// import ActivityCreate from "./components/ActivityCreate/ActivityCreate";

// function App() {
//   return (
//     <div className="App App-header">
//       <BrowserRouter>
//         <NavBar />
//         <Route exact path="/">
//           <LandingPage />
//         </Route>
//         {/* <Switch> */}
//         <Route path="/home/countries">
//           <ButtonBar />
//           <Home />
//           <Pagination />
//         </Route>
//         <Route exact path="/country/:alpha3code">
//           <CountryDetails />
//         </Route>
//         <Route exact path="/activities">
//           <ActivityCreate />
//         </Route>
//         <Route exact path="/order/:order">
//           <ButtonBar />
//           <Pagination />
//           <Countries />
//         </Route>
//         {/* </Switch> */}
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;
