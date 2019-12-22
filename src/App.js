import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Search from "./components/Search";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/search" render={props => <Search {...props} />} />
      </Switch>
    </Router>
  );
}
