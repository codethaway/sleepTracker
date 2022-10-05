//jshint esversion:6
import React, { useState } from 'react';
import axios from 'axios'
import FormContainer from './FormContainer'
import { Button, Form, Row, Col } from 'react-bootstrap'
import ClearIcon from '@mui/icons-material/Clear';
import { Link } from 'react-router-dom';
import "../styles/Login.css";
import Message from './Message';
function Signup({ history }) {
    const [ isError, setIsError ] = useState(null)
    // const redirect = location.search ? location.search.split('=')[1] : '/'
    const [user, setUser] = useState({
        username: "",
        handle: "",
        password: "",
        confirmPassword: ""
    });


    function handleChange(event) {
        const { name, value } = event.target
        setUser(prevData => ({
            ...prevData,
            [name]: value
        }))
    }
    const submitHandler = async (event) => {
        
        event.preventDefault();

        
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        if(user.password !== user.confirmPassword) {
            setIsError('Passwords do not match')
        } else {

            try {
             const { data } = await axios.post('/api/users/register', {...user}, config)
             console.log(data);
             
            history.push(`entry/${data}`)
            } catch (error) {
     
             const errorMessage = error.response && error.response.data.message ? error.response.data.message : error.message
             setIsError(errorMessage)
            }

        }
       
        setUser({
            username: "",
            handle: "",
            password: "",
            confirmPassword: ""
        });

        

    }
    

    return (

        
        <FormContainer>
        <h2>Register</h2>
            { isError && <Message variant='danger'>{ isError }</Message>}
            <Link to="/" className="cancel"><ClearIcon></ClearIcon></Link>
           <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control className="mb-3" type='text' placeholder='Enter Name' name='handle' value={user.handle} onChange={handleChange}></Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control className="mb-3" type='email' placeholder='Enter Email' name='username' value={user.username} onChange={handleChange}></Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control className="mb-3" type='password' placeholder='Enter Password' name='password' value={user.password} onChange={handleChange}></Form.Control>
            </Form.Group>
            <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control className="mb-3" type='password' placeholder='Confirm Password' name='confirmPassword' value={user.confirmPassword} onChange={handleChange}></Form.Control>
            </Form.Group>
            <Button type="submit" variant="dark">
                Register
            </Button>
        </Form>

        <Row className='py-3'>
            <Col>
                Have an account?{' '} <Link to={ '/login'}>
                    Login
                </Link>
            </Col>
        </Row>
        </FormContainer>

    )
}

export default Signup
