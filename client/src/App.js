import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import NavBar from "./components/NavBar/NavBar";
import CountryDetails from "./components/CountryDetails/CountryDetails";
import Home from "./components/Home/Home";
import ActivityCreate from "./components/ActivityCreate/ActivityCreate";

function App() {
  return (
    <div className="App App-header">
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
          </Route>
          <Route exact path="/createactivity">
            <ActivityCreate />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
