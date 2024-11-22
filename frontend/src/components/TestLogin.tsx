import React, { useState } from 'react';
import axios from 'axios';
import {login, register} from './APICalls';



function TestLogin() {
    const [formData, setFormData] = useState({firstname: '', lastname: '', email: '', password: ''});
    const [message, setMessage] = useState('');
    const [loggedInUser, setLoggedInUser] = useState('');

    const {firstname, lastname, email, password} = formData;

    function onChange(e: any) {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

s
    async function onSubmitLogin(e: any) {
        e.preventDefault();
        let res = await login(email, password);
        if(res.result == true)
        {
            setMessage('Logged in successfully.');
            setLoggedInUser(email);
        }
        else
        {
            setMessage('Failed to login.');
            console.error(res.error);
        }
    }

    async function onSubmitRegister(e: any) {
        e.preventDefault();
        let res = await register(firstname, lastname, email, password);
        if(res.result == true)
        {
            setMessage('Registered successfully');
            setLoggedInUser(email);
        }
        else
        {
            setMessage('Failed to register');
            console.error(res.error);
        }
    }

    async function onSubmitLogout(e: any) {
        e.preventDefault();
        setLoggedInUser('');
        localStorage.removeItem('token');
    }
    return (
        <div className="auth-form">
            <h2>Login</h2>
            <form>
                <input type="text" 
                       placeholder="Firstname" 
                       name="firstname" 
                       value={firstname} 
                       onChange={onChange} 
                       required />
                <input type="text" 
                       placeholder="Lastname" 
                       name="lastname" 
                       value={lastname} 
                       onChange={onChange} 
                       required />
                <input type="text" 
                       placeholder="Email" 
                       name="email" 
                       value={email} 
                       onChange={onChange} 
                       required />
                <input type="password" 
                       placeholder="Password" 
                       name="password" 
                       value={password} 
                       onChange={onChange} 
                       required />
                <button onClick={onSubmitLogin}>Login</button>
                <button onClick={onSubmitRegister}>Register</button>
                <button onClick={onSubmitLogout}>Logout</button>
            </form>
            <p className="message">{message}</p>
            <p>Logged in as {loggedInUser}</p>
        </div>
    );
};

export default TestLogin;
