import React from 'react'
import {
BrowserRouter as Router,
Switch,
Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Navigation from './components/Navigation.jsx'
import AuthProvider from './context/AuthContext.jsx';
import PrivateRoute from './helper/PrivateRoute';

import { ToastProvider } from 'react-toast-notifications';
import { QueryClient, QueryClientProvider, } from 'react-query'
import { webRoutes, privateRoutes } from './routes/index.jsx';


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
})

function App() {
  return (
    
    <Router>
  <div className="wrapper">
    <div className="row no-gutters">
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <ToastProvider>

    <Navigation />
    
    <React.StrictMode>
    <Switch>
    {webRoutes?.map((route => (
        <Route exact={true} key={route.path} path={route.path} component={route.component} />
    )))}

    {privateRoutes?.map((route => (
      <PrivateRoute exact={true} key={route.path} path={route.path} component={route.component} />
    )))}


    </Switch>
    </React.StrictMode>
    </ToastProvider> 
    </AuthProvider>  
    </QueryClientProvider>
</div>
  </div>
</Router>

  );
}

export default App;
