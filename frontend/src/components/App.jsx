//jshint esversion:6

import React from 'react';
import "../styles/bootstrap.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './Home';
import '../styles/App.css';
import Login from "./Login";
import Signup from './Signup';
import Footer from "./Footer"
import Entry from "./Entry";

function App() {

  return (
    <Router>
      <div className="App">
        <Route path="/" exact>
          <Home  />
        </Route>
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Signup />
          </Route>
          <Route path="/entry/:id" component={ Entry } exact/>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
