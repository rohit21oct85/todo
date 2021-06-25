import React , {useState, useEffect,useRef, useContext} from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom'


import {AuthContext} from '../../context/AuthContext';
import './Login.css';
import axios from 'axios'
import API_URL from '../../helper/ApiHelper.jsx';
import { useToasts } from 'react-toast-notifications';

export default function Register() {
      console.log(API_URL)
    const history = useHistory();
    const location = useLocation();
    const { addToast } = useToasts();
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState(null);
    const {dispatch,state } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const submitForm = async (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        if(name === ''){
            addToast('Please enter your full name', { appearance: 'error',autoDismiss: true });
            return false;
        }else if(email === ''){
            addToast('Please enter email address', { appearance: 'error',autoDismiss: true });
            return false;
        }else if(password === ''){
            addToast('Please enter password', { appearance: 'error',autoDismiss: true });
            passwordRef.current.focus()
            return false;
        }else{
            setLoading(true);
            
            const formData = {name: name, email: email , password: password};
            const response = await axios.post(`${API_URL}v1/auth/register`, formData);
            if(response?.data?.status === 203){
                addToast(`${response?.data?.message}`, { appearance: 'error',autoDismiss: true });
                setLoading(false);
            }else{
                  addToast(`${response?.data?.message}`, { appearance: 'success',autoDismiss: true });
                  setLoading(false);
                  history.push('/user/login');
            }
            
            
            
        }   
    }
    
    useEffect(checkLoggedInUser,[state]);
    async function checkLoggedInUser(){
        if(state?.isLoggedIn){
            window.location.href = `/user/todo`;
        }else{
            history.push('/user/register');
        }
    }

    return (
        <div className="container-fluid p-0 m-0 text-center LoginBg" style={{
            background: `url('/bg.png')`
        }}>
            <div className="row no-gutter">
                <div className="adminRegisterDiv">
                    <h4>User Register </h4>    
                    <hr />
                
                <form autoComplete="Off" onSubmit={submitForm}>
                    <div className="form-group text-left">
                        <label> <span className="fa fa-send mr-2"></span> Full Name</label>
                        <input className="form-control" type="text" autoComplete="off" ref={nameRef} placeholder="Enter full name" />
                        <p className="text-muted mt-2">
                            We'll never share your email with anyone else.
                        </p>
                    </div>
                    <hr />
                    <div className="form-group text-left">
                        <label> <span className="fa fa-send mr-2"></span> Email address</label>
                        <input className="form-control" type="text" autoComplete="off" ref={emailRef} placeholder="Enter email" />
                        <p className="text-muted mt-2">
                            We'll never share your email with anyone else.
                        </p>
                    </div>
                    <hr />
                    <div className="form-group">
                        <label className="text-left"> <span className="fa fa-lock mr-2"></span> Password</label>
                        <input className="form-control" type="password" autoComplete="Off" ref={passwordRef} placeholder="Password" />
                        <p className="text-muted mt-2">
                            We'll never share your password with anyone else.
                        </p>
                    </div>
                    <hr />
                    <button 
                        className="btn btn-md btn-block btn-success dark w-100" 
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                            <span className="fa fa-spinner mr-2"> </span> Authenticating...
                            </>
                        ):(
                            <>
                            <span className="fa fa-lock mr-2"> </span> Create Your Account
                            </>
                        )}
                    </button>
                    </form>
                    <hr />
                    <p>Already have an account...? <NavLink to="/user/login">Login</NavLink></p>
                </div>
            </div>
            
        </div>
    )
}
 