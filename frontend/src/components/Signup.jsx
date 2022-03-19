//jshint esversion:6
import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { Link } from 'react-router-dom';
import "../styles/Login.css";
function Signup({ history }) {

    const [user, setUser] = React.useState({
        username: "",
        handle: "",
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
        
        fetch('/api/users/register', options)
            .then(response => (response.json())).then(id => history.push(`/entry/${id}`));

        setUser({
            username: "",
            handle: "",
            password: ""
        });

        event.preventDefault();
        

    }
    

    return (

        <div className=" login container">
            <div className="overlay"> </div>
            <form action="/register" method='post'>
                <Link to="/" className="cancel"><ClearIcon></ClearIcon></Link>
                <div className="container-fluid">

                    <div className="mb-3 drop">
                        <input type="text" className="form-control" onChange={handleChange} id="InputUsername" name="handle" value={user.handle} placeholder="Username" autoComplete="off" />
                    </div>
                    <div className="mb-3 drop">
                        <input type="email" className="form-control" onChange={handleChange} name="username" id="RegisterEmail" value={user.username} placeholder="Email" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3 drop">
                        <input type="password" className="form-control" onChange={handleChange} name="password" value={user.password} placeholder="Password" id="exampleInputPassword1" />
                    </div>
                    <span> Have an account? --{'>'} Login instead.</span>

                </div>
                <button type="submit" onClick={submitData} className="btn btn-primary">Sign up </button>
            </form>
        </div>

    )
}

export default Signup
