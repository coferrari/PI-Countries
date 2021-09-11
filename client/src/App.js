import style from "./App.module.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import NavBar from "./components/NavBar/NavBar";
import CountryDetails from "./components/CountryDetails/CountryDetails";
import Home from "./components/Home/Home";
import ActivityCreate from "./components/ActivityCreate/ActivityCreate";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Switch>
          <Route path="/home/countries">
            <NavBar />
            <Home />
          </Route>
          <Route exact path="/country/:alpha3code">
            <NavBar />
            <CountryDetails />
          </Route>
          <Route exact path="/activities">
            <NavBar />
            <Home />
          </Route>
          <Route exact path="/createactivity">
            <NavBar />
            <ActivityCreate />
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
