import React, { useState } from 'react'
// import styled from 'styled-components';
import '../styles/login.css';
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';
import { LoginRoute } from '../utils/APIRoutes';
import { ToastContainer, toast } from 'react-toastify';
import { setCookie } from '../commonFuncs/Cookies.js';
import 'react-toastify/dist/ReactToastify.css';
function Login() {

    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        password: "",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validate()) {
            const { username, password } = values;
            const { data } = await axios.post(LoginRoute, { username, password });
            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            }
            if (data.status === true) {
                ;
                // setCookie("Chat-app-user", JSON.stringify(data.user));
                sessionStorage.setItem("Chat-app-user", JSON.stringify(data.user));
                navigate("/");
            }
        }
    };

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        hideProgressBar: false,
        theme: "dark",
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };

    const validate = () => {
        const { username, password } = values;
        if (username.length === 0) {
            toast.error("Username must be required", toastOptions);
            return false;
        } else if (password.length === 0) {
            toast.error("Password must be required", toastOptions);
            return false;
        }
        return true;
    };

    return (
        <>
            <div className='main'>
                <div className='wrapper'>
                    <form onSubmit={(event) => { handleSubmit(event) }}>
                        <h2>Login</h2>
                        <div className="input-field">
                            <input type="text" id="username" name="username" onChange={(e) => handleChange(e)} required />
                            <label>Enter your Username</label>
                        </div>
                        <div className="input-field">
                            <input type="password" id="password" name="password" onChange={(e) => handleChange(e)} required />
                            <label>Enter your password</label>
                        </div>
                        <div className="forget">
                            <label htmlFor="remember">
                                <input type="checkbox" id="remember" />
                                <p>Remember me</p>
                            </label>
                            <Link to="#">Forgot password?</Link>
                        </div>
                        <button type="submit">Log In</button>
                        <div className="register">
                            <p>Don't have an account? <Link to="/register">Register</Link></p>
                        </div>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </>
    )
}

// const FormContainer = styled.div`
    
// `;

export default Login;
