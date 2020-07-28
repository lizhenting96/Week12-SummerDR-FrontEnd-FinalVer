import React from "react";
import "./styles.css";
import SelectPage from "./Pages/DashboardSelect";
import ScriptPage from "./Pages/DashboardScript";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

export default function App() {
  return (
    <Router>
        {/* <SigninPage></SigninPage> */}
        <Switch>
          <Route exact path='/log-in' component={LoginPage} />
          <Route exact path='/sign-up' component={SignupPage} />
          <Route exact path='/select' component={SelectPage} />
          <Route exact path='/script' component={ScriptPage} />
        </Switch>
    </Router>
  );
}
