
import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { Link } from 'react-router-dom'

import "../styles/Login.css";
function Login( { history } ) {
    const [user, setUser] = React.useState({
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
    function submitData(event) {
        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        };

        fetch('/api/users/login', options)
            .then(response => (response.json())).then(data => {
                history.push(`/entry/${data}`)
              })
        setUser({
            username: "",
            password: ""
        });

        event.preventDefault();


    }


    return (

        <div className=" login container">
            <div className="overlay"> </div>
            <form action="/login">
                <Link to="/" className="cancel"><ClearIcon></ClearIcon></Link>
                <div className="container-fluid">

                    <div className="mb-3 drop">
                        <input type="email" className="form-control" id="InputUsername" onChange={handleChange} name="username" value={user.username} placeholder="Email" autoComplete="off" />
                    </div>
                    <div className="mb-3 drop">
                        <input type="password" className="form-control" name="password" onChange={handleChange} value={user.password} placeholder="Password" id="exampleInputPassword1" autoComplete="off" />
                    </div>
                    <span> Don't have an account?   <Link to="/register">Signup </Link> instead.</span>

                </div>
                <button type="submit" onClick={submitData} className="btn btn-primary">Log In</button>
            </form>
        </div>

    )



}

export default Login
