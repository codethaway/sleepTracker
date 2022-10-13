
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import FormContainer from './FormContainer'
import ClearIcon from '@mui/icons-material/Clear';
import { Link } from 'react-router-dom'
import axios from 'axios'
import Message from './Message'

import "../styles/Login.css";
function Login( { history } ) {

    const [ errorMessage, setErrorMessage ] = useState(null)
    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    function handleChange(event) {
        const { name, value } = event.target
        setUser(prevData => ({
            ...prevData,
            [name]: value
        }))
    }
    const submitHandler  = async (event) => {

        
        event.preventDefault();
        
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        try {
            const { data } = await axios.post('/api/users/login', { ...user }, config)
            console.log(data);
            history.push(`entry/${data}`)

        } catch (error) {
            const errorMessage = error.response && error.response.data.message ? error.response.data.message : error.message
            setErrorMessage(errorMessage)
        }

        setUser({
            username: "",
            password: ""
        });



    }


    return (

        <FormContainer>
            <h2>LOG IN</h2>
            { errorMessage && <Message variant='danger'>{ errorMessage }</Message>}
            <Link to="/" className="cancel"><ClearIcon></ClearIcon></Link>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control className="mb-3" type='email' placeholder='Enter Email' name='username' value={user.username} onChange={handleChange}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control className="mb-3" type='password' placeholder='Enter Password' name='password' value={user.password} onChange={handleChange}></Form.Control>
                </Form.Group>
                <Button className='px-4 py-2' type="submit" variant="dark">
                    Sign In
                </Button>
            </Form>
        </FormContainer>

    )



}

export default Login
