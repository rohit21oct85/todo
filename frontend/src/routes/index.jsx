import Login from '../Pages/auth/Login'
import Register from '../Pages/auth/Register'
import ToDo from '../Pages/todo/ToDo'


export const webRoutes =  [
    { 
        path:'/',
        component: Login
    },
    { 
        path:'/user/login',
        component: Login
    },
    { 
        path:'/user/register',
        component: Register
    }

];

export const privateRoutes = [
      {
        path: '/user/todo/:todo_id?',
        component: ToDo
      }
];
