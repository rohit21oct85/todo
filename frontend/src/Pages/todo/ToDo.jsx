import React,{useContext, useEffect} from 'react'
import {useLocation, useHistory, useParams} from 'react-router-dom'
import './mainDash.css';
import AddTodo from './components/AddTodo';
import {AuthContext} from '../../context/AuthContext';
import AllTodo from './components/AllTodo';

export default function ToDo() {
    const history = useHistory();
    const params = useParams();
    const location = useLocation();
    const path = location?.pathname;
    const { state, dispatch } = useContext(AuthContext);
    useEffect(checkURL, [state]);

    async function checkURL(){
        if(path === '/admin/'){
            history.push(`/admin/dashboard`);
        }    
    }

return (

<>
{state.isLoggedIn && (
   
<div className="col-md-10 main_dash_area">
    <div className="main-area-all">
        <div className="dashboard_main-container">
            <div className="dash-main-head">
                <h2>Todo List</h2>
            </div>
            <div className="dash_over_view">
                <div className="row">
                    <div className="col-md-3 pl-0">
                        <AddTodo />
                    </div>
                    
                    <div className="col-md-6 pl-0">
                        <AllTodo />
                    </div>

                </div>    
            </div>
        </div>
    </div>
    
</div>  
)}   
</>

)
}
