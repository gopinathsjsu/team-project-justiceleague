import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserHome from "./views/layouts/UserHome";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <UserHome />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
