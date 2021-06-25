import React, { useContext, useState } from 'react'
import {useLocation, useParams, useHistory} from 'react-router-dom'
import {useMutation, useQueryClient} from 'react-query'
import axios from 'axios'
import API_URL from '../../../../helper/ApiHelper';
import { useToasts } from 'react-toast-notifications';
import {AuthContext} from '../../../../context/AuthContext';

export default function useUpdateTodo(formData) {
      
      const queryClient = useQueryClient()
      const {state} = useContext(AuthContext);
      const params = useParams();
      const location = useLocation();
      const path = location.pathname;
      const history = useHistory();
      
      const options = {
            headers: {
                  'Content-Type': 'Application/json',
                  'Authorization':'Bearer '+state.access_token
            }
      }      
      const { addToast } = useToasts();
      return useMutation((formData) => {
            let todo_id =  params?.todo_id;
            return axios.patch(`${API_URL}v1/todo/update/${todo_id}`, formData, options)
        },{
            onSuccess: () => {
                queryClient.invalidateQueries(`todos`)
                history.push(`/user/todo`);
                addToast('Todo Updated successfully', { appearance: 'success',autoDismiss: true });
            }
        });
}
