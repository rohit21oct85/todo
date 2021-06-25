import React , { useRef}from 'react'
import {useMutation} from 'react-query'
import { useForm } from "react-hook-form";
import useCreateTodo from './hooks/useCreateTodo';
import { useHistory, useParams } from 'react-router-dom';
import useSingleTodo from './hooks/useSingleTodo';
import useUpdateTodo from './hooks/useUpdateTodo';

export default function AddTodo() {
      const history = useHistory();
      const params = useParams();
      const { register, handleSubmit,reset, watch, formState: { errors } } = useForm();
      const onSubmit = data => {
            if(params?.todo_id){
                  updateMutation.mutate(data);
            }else{
                  createMutation.mutate(data);
            }
            reset();
      };
      const createMutation = useCreateTodo();
      const updateMutation = useUpdateTodo()
      const {data: todo} = useSingleTodo();
      console.log(todo)
      return (
            <div>
                  <h2>Add Todo</h2>
                  <hr />
                  <form onSubmit={handleSubmit(onSubmit)}>
                        <input className="form-control mb-2" defaultValue={params?.todo_id ? todo?.title: ''} watch={params?.todo_id ? todo?.title: ''} ref={register} placeholder="Enter title" {...register("title",{ required: true })} />
                        {errors.title && <span>This field is required</span>}
                        <input className="form-control mb-2" defaultValue={params?.todo_id ? todo?.description: ''} watch={params?.todo_id ? todo?.description: ''} ref={register} placeholder="Enter Description" {...register("description", { required: true })} />
                        {errors.description && <span>This field is required</span>}
                        <div className="form-group flex">
                        <button className="btn btn-md dark" type="submit">
                              {params?.todo_id ? 'Update': 'Save'}
                        </button>
                        {params?.todo_id && (
                              <button className="btn btn-md dark bg-danger br-15" type="button"
                              onClick={e => {
                                    history.push(`/user/todo`)
                                    reset()
                              }}>
                                    Cancel
                              </button>
                        )}
                        </div>

                  </form>
            </div>
      )
}
