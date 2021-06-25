import React, { useContext } from 'react'
import {useLocation, useHistory} from 'react-router-dom'
import {useMutation, useQueryClient} from 'react-query'
import axios from 'axios'
import API_URL from '../../../../helper/ApiHelper';
import { useToasts } from 'react-toast-notifications';
import {AuthContext} from '../../../../context/AuthContext';

export default function useCreateTodo(formData) {
      
      const queryClient = useQueryClient()
      const {state} = useContext(AuthContext);
      const history = useHistory();
      
      const options = {
            headers: {
                  'Content-Type': 'Application/json',
                  'Authorization':'Bearer '+state.access_token
            }
      }      
      const { addToast } = useToasts();
      return useMutation(formData => {
            return axios.post(`${API_URL}v1/todo/create`, formData, options)
        },{
            onSuccess: () => {
                queryClient.invalidateQueries(`todos`)
                history.push(`/user/todo`);
                addToast('Todo added successfully', { appearance: 'success', autoDismiss: true });
            }
        });
      
}
