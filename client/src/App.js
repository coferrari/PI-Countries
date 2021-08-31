import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import NavBar from "./components/NavBar/NavBar";
import CountryDetails from "./components/CountryDetails/CountryDetails";
import Countries from "./components/Countries/Countries";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/home'>
          <NavBar />
          <Countries />

        </Route>
        <Route path='/country/:alpha3code'>
          <CountryDetails />
        </Route>
        {/* <Route></Route> */}
        {/* <Route></Route> */}
        <Route exact path="/">
          <LandingPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
