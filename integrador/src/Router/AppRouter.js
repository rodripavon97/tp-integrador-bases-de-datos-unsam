import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MisDescargas from "../pages/MisDescargas";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/misdescargas" component={MisDescargas} />
      </Switch>
    </Router>
  );
};
