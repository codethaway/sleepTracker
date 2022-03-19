//jshint esversion:6

import React from 'react';
import "../styles/bootstrap.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
        <Route path='/' component={ Home } exact />
        <Route path='/login' component={ Login } />
        <Route path='/register' component={ Signup } />
        <Route path='/entry/:id' component={ Entry } />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
