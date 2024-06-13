import React,{useState} from 'react'
// import styled from 'styled-components';
import '../styles/register.css';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import { RegisterRoute } from '../utils/APIRoutes';
import { ToastContainer, toast } from 'react-toastify';
import { setCookie } from '../commonFuncs/Cookies.js';
import 'react-toastify/dist/ReactToastify.css';


function Register() {

    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(validate()){
            const {username, email, password} = values;
            const { data } = await axios.post(RegisterRoute, {username, email, password});
            if(data.status===false){
                alert(data.msg);
            }
            if(data.status ===true){
                // setCookie("Chat-app-user", JSON.stringify(data.user));
                sessionStorage.setItem("Chat-app-user", JSON.stringify(data.user));
                navigate("/");
            }
            
        }
        else{

        }
        
    };

    const handleChange = (event) => {
        setValues({...values, 
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
        const {username, password, confirmPassword} = values;
        if (username.length < 6) {
            toast.error("Username must be of atleast 6 characters.", toastOptions);
            return false;
          } else if (password.length < 8) {
            toast.error("Password must be of atleast 8 characters.", toastOptions);
            return false;
          } else if (password !== confirmPassword) {
            toast.error("Password must be same with Confirm password.", toastOptions);
            return false;
          } 
        return true;
    };

  return (
    <>
        {/* <FormContainer>
            <form onSubmit={(event) => {handleSubmit(event)}}>
                <h1>Register</h1>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input type="text" id="username" name="username" onChange={(e)=>handleChange(e)}/>
                </div>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="email" id="email" name="email" onChange={(e)=>handleChange(e)}/>
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" name="password" onChange={(e)=>handleChange(e)}/>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password: </label>
                    <input type="password" id="confirmPassword" name="confirmPassword" onChange={(e)=>handleChange(e)}/>
                </div>
                <button type="submit">Register</button>
            </form>
            <span>Alreday have an account<Link to="/login">Login</Link> </span>
        </FormContainer> */}

        <div className='main'>
            <div className='wrapper'>
                <form onSubmit={(event) => { handleSubmit(event) }}>
                    <h2>Register</h2>
                    <div className="input-field">
                        <input type="text" id="username" name="username" onChange={(e) => handleChange(e)} required />
                        <label>Enter your Username</label>
                    </div>
                    <div className="input-field">
                        <input type="email" id="email" name="email" onChange={(e) => handleChange(e)} required />
                        <label>Enter your Email:</label>
                    </div>
                    <div className="input-field">
                        <input type="password" id="password" name="password" onChange={(e) => handleChange(e)} required />
                        <label>Enter your password</label>
                    </div>
                    <div className="input-field">
                        <input type="password" id="confirmPassword" name="confirmPassword" onChange={(e) => handleChange(e)} required />
                        <label>Confirm password</label>
                    </div>
                    <button type="submit">Sign Up</button>
                    <div className="register">
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    </>
  )
}

// const FormContainer = styled.div``;

export default Register;
