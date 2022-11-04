import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./home";
import ContactUs from "./contactus";
import Reviews from "./reviews";
import NotFound from "./notFound";
import Bookappointment from "./bookappointment";
import Signup from "./signup";
import Login from "./login";
import Appointment from "./appointment";
import Admin from "./admin";
import Payment from "./payment";
import Admindb from "./admindb";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/admin">
            <Admin />
          </Route>
          <Route exact path="/contact">
            <ContactUs />
          </Route>
          <Route exact path="/appointment">
            <Appointment />
          </Route>
          <Route exact path="/reviews">
            <Reviews />
          </Route>
          <Route exact path="/payment">
            <Payment />
          </Route>
          <Route exact path="/admindb">
            <Admindb />
            </Route> 
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/bookAppointment">
            <Bookappointment />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>

          <Route>
            <NotFound path="*" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
