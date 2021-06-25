import {useParams} from 'react-router-dom'
import {useContext}  from 'react'
import {useQuery} from 'react-query';
import axios from 'axios';
import {AuthContext} from '../../../../context/AuthContext.jsx';
import API_URL from '../../../../helper/ApiHelper'

export default function useSingleTodo() {
    const params = useParams();
    const todo_id = params?.todo_id
    const {state } = useContext(AuthContext);
    return useQuery(`single-todo-${todo_id}`, async () => {
        if(todo_id !== undefined){
            const result = await axios.get(`${API_URL}v1/todo/view/${todo_id}`,{
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization':'Bearer '+state.access_token
                }
            });
            return result.data.data; 
        }
        
    });
    
}
