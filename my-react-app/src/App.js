import React from "react";
import "./styles.css";
import SelectPage from "./Pages/Select";
import ScriptPage from "./Pages/Script";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/select' component={SelectPage} />
        <Route exact path='/script' component={ScriptPage} />
      </Switch>
    </Router>
  );
}
