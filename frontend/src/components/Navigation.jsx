import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory ,NavLink, useLocation, useParams } from "react-router-dom";
import './Nav.css';
import { Nav} from 'react-bootstrap'
import {AuthContext} from '../context/AuthContext';

export default function Navigation() {
    const history = useHistory();
    const location = useLocation();
    const params = useParams();

    const { state, dispatch } = useContext(AuthContext);
    
    function logout(){
        dispatch({type: 'LOGOUT'})
        history.push('/user/login')
        
    }
return (
<>

{state.isLoggedIn && (
<div className="login_menu col-lg-2 col-md-2 col-12" bg="dark" variant="dark" expand="lg">
    <div className="webLogo row" style={{ paddingLeft: '30px'}}>
        <h4>Todo</h4>
    </div>
    <div className="user_area">
        <div className="user_options mt-1">

            <div className="col-md-12 p-0 user_details">
                <span className="user_name">{state?.fullname}</span>
            </div>
            <div className="col-md-12 p-0 user_details">
                <span className="user_name">{state?.email}</span>
            </div>
            <ul>
                <li></li>
                <li as={Link} onClick={logout} alt="Logout">
                    <button className="bg-danger dark br-10  pl-2 pr-2 pt-2 pb-2">
                        <span className="fa fa-power-off mr-2"></span>
                        Logout Account
                    </button>
                </li>
                <li></li>
            </ul>
        </div>
    </div>
    <div className="navbar_menus">
        <ul>
            <li>
                <Nav className="ml-auto">
                    <NavLink to={`/user/todo`}> <span className={`bi bi-speedometer text-warning`}></span> Todo </NavLink>
                </Nav>
            </li>
        </ul>
    </div>
            
            
</div>
)}
        
</>             
)
}
