//jshint esversion:9

import React, { useState, useEffect } from "react";
import icon from "../moon copy.svg";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { Col, Row } from 'react-bootstrap'
import Button from '@mui/material/Button';
import axios from 'axios'
import BasicDatePicker from './Datetime';
import Zoom from "@material-ui/core/Zoom";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "./Table";
import Message from './Message'
import Graph from './Graph'

function Entry( { history, match } ) {
    const [ errorMessage, setErrorMessage ] = useState(null)
    const [entries, setEntries] = useState([]);
    const [ userDetails, setUserDetails ] = useState({handle: 'Comrade'})
    const [isClicked, setIsClicked] = useState(false);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`/api/entries/${match.params.id}`)
                
                 console.log(data)
                 setUserDetails(prevDetails => {
                     return ({ ...prevDetails, ...data })
                 })
                 setEntries(prevEntries => {
                     return ([...prevEntries, ...data.sleepData]);
                 })
            } catch (error) {
                history.push('/login')
            }
        }
        fetchData()
            

    }, [match, history]);


    function addEntries(newEntry) {
        setEntries(prevEntries => {
            return [...prevEntries, newEntry];
        });
    }

    const deleteEntries = async() => {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        
        try {

            const { data } = await axios.delete(`/api/entries/delete/${ match.params.id }`, config)
            console.log(data);
            setErrorMessage(data)
            setEntries([])

        } catch (error) {
            const errorMessage = error.response && error.response.data.message ? error.response.data.message : error.message
            setErrorMessage(errorMessage)
        }


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
        axios.get('/api/users/logout')
        console.log("clicked")
    }

    return (

        <div className="entry">
            <nav className="nav entry-nav">
                <img src={icon} alt="sleeping-icon" />
                <div className="d-flex justify-content-between align-items-center">
                    <h2>Hello, {userDetails.handle}.</h2>
                    <Link className='btn btn-dark my-3' to='/' onClick={ logout }> Logout</Link>
                </div>
            </nav>
            <div>
                <h1>Daily Sleep Tracker</h1>
                {entries.length === 7 ? <Button variant="contained" disabled> <AddIcon fontSize="large" /> New Entry</Button> : <Button variant="contained" onClick={handleEntry} > <AddIcon fontSize="large" /> New Entry</Button>}

            </div>
            <Row className="graph-table">
                <Col className="graph" lg={6} md={6} sm={12}>
                    <h4 style={{textAlign: 'left'}} className='head-title mb-4'>Sleep Stats</h4>
                  <Graph dates= { dates } time= { time }/>
                </Col>
                <Col lg={6} md={6} sm={12} style={{textAlign: 'right'}}>
                    <h4 style={{textAlign: 'left'}} className='head-title mb-4'>Sleep Duration.</h4>
                    { errorMessage && <Message variant='success'>{errorMessage}</Message>}
                  <Table key={1} data={entries} />            
                    <Button variant="secondary"  onClick={deleteEntries}>
                        Delete All <DeleteIcon />
                    </Button>
                </Col>
            </Row>
            {isClicked && <div className="overlay"></div>}
            <Zoom in={isClicked}>
                <div className="date-picker"><BasicDatePicker date="date" match={match} onCloseEntry={handleEntry} onAdd={addEntries} timeElapsed="timeElapsed" sleepTime="sleepTime" wakeUpTime="wakeUpTime" /></div>
            </Zoom>
        </div>
    )
}

export default Entry;
