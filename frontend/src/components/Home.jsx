//jshint esversion:8
import '../styles/bootstrap.css';

import icon from "../moon.svg";

import React from 'react';
import { Link } from 'react-router-dom';
function Home () {

    return (
        <div className="background">
          
          <div className="centered">
          <nav className="nav py-3">
            <img src={icon} alt="sleeping-icon"/>
          </nav>
          <div className="load">
            <div className="top-header">
              <h1 className="display-3" style={{color: '#fff'}}>Daily Sleep Tracker</h1>
              <p className="lead">Stick to a sleep schedule, Be Consistent.</p>
            </div>
            <hr/>
           <p className="lead">
            <Link to="/login" className="btn btn-lg btn-default border-white bg-white mr-1"> Log In </Link>
            <Link to="/register" className="btn btn-lg btn-default border-white ml-1">Register</Link>
            </p>
          </div>
          </div>
        </div>
    )
}
export default Home
