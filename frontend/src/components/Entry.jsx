//jshint esversion:8

import React, { useState, useEffect } from "react";
import icon from "../moon copy.svg";
import { Redirect, Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import axios from 'axios'
import BasicDatePicker from './Datetime';
import Zoom from "@material-ui/core/Zoom";
import Table from "./Table";
import Graph from './Graph'

function Entry( { match } ) {
    const [entries, setEntries] = useState([]);
    const [isClicked, setIsClicked] = useState(false);
    const [redirect, setRedirect] = useState(false);


    useEffect(() => {
        fetch(`/api/entries/${match.params.id}`)
            .then(response => response.json()).then(json => {
                if (json === false) {
                   setRedirect(true)
                } else {
                    setEntries(prevEntries => {
                        return [...prevEntries, ...json.sleepData];
                    })
                } 
        });

    }, [match]);
    
    if (redirect) {
        return <Redirect to='/login' />
    }

    function addEntries(newEntry) {
        setEntries(prevEntries => {
            return [...prevEntries, newEntry];
        });
    }
    var dates = [];
    let time = [];
    console.log(entries);

    entries.forEach((entry) => {
        dates.push(`${new Date(entry.date).getMonth() + 1}/${new Date(entry.date).getDate()}`);
        time.push(entry.timeElapsed);
    });

    function handleEntry() {
        isClicked ? setIsClicked(false) : setIsClicked(true);
    }
    const logout = () => {
        axios.get('/logout')
        console.log("clicked")
    }

    return (

        <div className="entry">
            <nav className="nav entry-nav">
                <img src={icon} alt="sleeping-icon" />
                <div className="w-25 d-flex justify-content-between align-items-center">
                    <h2>Hello, Comrade.</h2>
                    <Link className='btn btn-dark my-3' to='/' onClick={ logout }> Logout</Link>
                </div>
            </nav>
            <div>
                <h1>Daily Sleep Tracker</h1>
                {entries.length === 7 ? <Button variant="contained" disabled> <AddIcon fontSize="large" /> New Entry</Button> : <Button variant="contained" onClick={handleEntry} > <AddIcon fontSize="large" /> New Entry</Button>}

            </div>
            <div className="graph-table">
                <Graph dates= { dates } time= { time }/>
                <Table key={1} data={entries} />
            </div>
            {isClicked && <div className="overlay"></div>}
            <Zoom in={isClicked}>
                <div className="date-picker"><BasicDatePicker date="date" match={match} onCloseEntry={handleEntry} onAdd={addEntries} timeElapsed="timeElapsed" sleepTime="sleepTime" wakeUpTime="wakeUpTime" /></div>
            </Zoom>
        </div>
    )
}

export default Entry;
