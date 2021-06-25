import { useContext } from 'react'
import {useMutation, useQueryClient} from 'react-query'
import axios from 'axios'
import API_URL from '../../../../helper/ApiHelper';
import { useToasts } from 'react-toast-notifications';
import {AuthContext} from '../../../../context/AuthContext';

export default function useDeleteTodo(todo_id) {
      const queryClient = useQueryClient()
      const {state} = useContext(AuthContext);
      const options = {
            headers: {
                  'Content-Type': 'Application/json',
                  'Authorization':'Bearer '+state.access_token
            }
      }      
      const { addToast } = useToasts();
      const status =  useMutation((todo_id) => {
            return axios.delete(`${API_URL}v1/todo/delete/${todo_id}`, options)
        },{
            onSuccess: () => {
                queryClient.invalidateQueries('todos')
                addToast('Todo Deleted successfully', { appearance: 'success',autoDismiss: true });
            }
        });
      return status;
}
