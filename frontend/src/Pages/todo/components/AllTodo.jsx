import React from 'react'
import { useHistory } from 'react-router'
import useDeleteTodo from './hooks/useDeleteTodo';
import useTodoList from './hooks/useTodoList'

export default function AllTodo() {
      const {data: todos} = useTodoList();
      const history = useHistory();
      const handleDelete = async (todo_id) => {
            // console.log(todo_id); return;
            await deleteMutation.mutate(todo_id);
      }
      
      const viewTodo = async (todo_id) => {
            let btnText = document.getElementById(`btn-${todo_id}`).value;
            if(btnText === 'View'){
                  document.getElementById(`btn-${todo_id}`).value = "Hide"
                  document.getElementById(`btn-${todo_id}`).innerHTML = "Hide"
                  document.getElementById(`desc-${todo_id}`).style.display = "block"
            }else{
                  document.getElementById(`btn-${todo_id}`).value = "View"
                  document.getElementById(`btn-${todo_id}`).innerHTML = "View"
                  document.getElementById(`desc-${todo_id}`).style.display = "none"
            }
            
      }

      const deleteMutation = useDeleteTodo();
      return (
            <div>
                  <h2>All Todo</h2>
                  <hr />
                  <div style={{ height: '400px', overflow: 'scroll'}} className="pr-2">
                  {todos?.map((todo, ind) => {
                  return(
                        <div className="card p-2 mb-2" style={{ marginRight: '16px'}} key={todo?.id}>
                              <div className="col-md-12 row">
                                   <div className="col-md-8">
                                          <h5><span className="badge-success">{ind+1}.</span> {todo?.title}</h5>
                                    </div>
                                    <div className="col-md-4">
                                          <button className="btn btn-sm dark ml-2"
                                          id={`btn-${todo?.id}`}
                                          value="View"
                                          onClick={() => viewTodo(todo?.id)}>View</button>
                                         <button className="btn btn-sm dark mr-2"
                                         onClick={e => {
                                               history.push(`/user/todo/${todo?.id}`)
                                         }}>Edit</button>
                                         <button className="btn btn-sm dark ml-2"
                                         onClick={() => handleDelete(todo?.id)}>Delete</button>
                                    </div> 
                              </div>
                              <div id={`desc-${todo?.id}`} style={{ display: 'none'}}>
                                    <hr />
                                    {todo?.description}
                              </div>
                        </div>
                        )
                  })}
                  </div>
            </div>
      )
}
