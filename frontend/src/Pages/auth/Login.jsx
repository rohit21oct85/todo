import React , {useState, useEffect,useRef, useContext} from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom'


import {AuthContext} from '../../context/AuthContext';
import './Login.css';
import axios from 'axios'
import API_URL from '../../helper/ApiHelper.jsx';
import { useToasts } from 'react-toast-notifications';

export default function Login() {
      console.log(API_URL)
    const history = useHistory();
    const location = useLocation();
    const { addToast } = useToasts();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState(null);
    const {dispatch,state } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const submitForm = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        if(email === ''){
            addToast('Please enter email address', { appearance: 'error',autoDismiss: true });
            return false;
        }else if(password === ''){
            addToast('Please enter password', { appearance: 'error',autoDismiss: true });
            passwordRef.current.focus()
            return false;
        }else{
            setLoading(true);
            
            const formData = {email: emailRef.current.value , password: passwordRef.current.value};
            const response = await axios.post(`${API_URL}v1/auth/login`, formData);
            if(response?.data?.status === 203){
                addToast(`${response?.data?.message}`, { appearance: 'error',autoDismiss: true });
                setLoading(false);
            }else{
                  let access_token = response?.data?.accessToken
                  let refresh_token = response?.data?.refreshToken
                  let fullname = response?.data?.name
                  let email = response?.data?.email
                  let uid = response?.data?.uid
                
                    
                
                  let isLoggedIn = true;
                  localStorage.setItem('access_token', access_token)
                  localStorage.setItem('refresh_token', refresh_token);
                  localStorage.setItem('fullname', fullname);
                  localStorage.setItem('email', email);
                  localStorage.setItem('uid', uid);
                  localStorage.setItem('isLoggedIn', isLoggedIn);
                  const payloadData = {
                        isLoggedIn,
                        fullname,
                        email,
                        uid,
                        access_token,
                        refresh_token
                  }
                  if(isLoggedIn){
                        dispatch({type: 'LOGIN', payload: payloadData});
                  }
            }
            
            
            
        }   
    }
    
    useEffect(checkLoggedInUser,[state]);
    async function checkLoggedInUser(){
        if(state?.isLoggedIn){
            window.location.href = `/user/todo`;
        }else{
            history.push('/user/login');
        }
    }

    return (
        <div className="container-fluid p-0 m-0 text-center LoginBg" style={{
            background: `url('/bg.png')`
        }}>
            <div className="row no-gutter">
                <div className="adminLoginDiv">
                    <h4>User Login </h4>    
                    <hr />
                
                <form autoComplete="Off" onSubmit={submitForm}>
                    <div className="form-group text-left">
                        <label> <span className="fa fa-send mr-2"></span> Email address</label>
                        <input className="form-control" type="email" autoComplete="off" ref={emailRef} placeholder="Enter email" />
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
                            <span className="fa fa-lock mr-2"> </span> Login Your Account
                            </>
                        )}
                    </button>
                    </form>
                    <hr />
                    <p>Dont have an account...? <NavLink to="/user/register">Register</NavLink></p>
                </div>
            </div>
            
        </div>
    )
}
 