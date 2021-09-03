import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import NavBar from "./components/NavBar/NavBar";
import CountryDetails from "./components/CountryDetails/CountryDetails";
import Countries from "./components/Countries/Countries";
import Footer from "./components/Footer/Footer"
import Home from "./components/Home/Home";
import ButtonBar from "./components/ButtonBar/ButtonBar";
import Pagination from "./components/Pagination/Pagination";

function App() {
  return (
    <div className="App App-header">
      <BrowserRouter>
        <Switch>
          <Route path='/home'>
            <NavBar />
            <ButtonBar />
            <Home />
            <Pagination />
            {/* <Footer /> */}
          </Route>
          <Route exact path='/country/:alpha3code'>
            <CountryDetails />
          </Route>
          <Route exact path='/order/:order'>
            <Countries />
          </Route>
          <Route exact path="/">
            <LandingPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
