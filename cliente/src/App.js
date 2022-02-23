import './App.css';
import Home from './components/home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import {
  Routes,
  Route,
  Link,
  Outlet,
  Router,
  useParams
} from "react-router-dom";
import Views from './components/abm/Views';
import Form from './components/abm/Form';
import 'bootstrap/dist/css/bootstrap.css';
import Update from './components/abm/Update';
import Header from './components/home/Header';
import { useEffect, useState } from 'react';
import AuthService from "./services/auth.service";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          
          <Route path="home" element={<Home />} />
          <Route path="view" element={<Views />} />
          <Route path="form" element={<Form />} />
          <Route path="update" element ={<Update />} >
              <Route path=":id" />
          </Route>
        </Route>
    </Routes>
    </div>
  );

  
function Layout() {
  const [currentUser,setCurrentUser] =useState(undefined);


  useEffect(()=>{ 
    const user = AuthService.getCurrentUser();
    if (user){
      setCurrentUser(user);
    }
  }
  ,[]  );

  const logOut=()=> {
    AuthService.logout();
  }

  return (
    <div>
     
      <nav className='navbar navbar-dark bg-dark '>
       <div>
         <a className="navbar-brand px-4">
           <Link className='text-decoration-none text-white ' to="Home">
             <Header  title="Expenses traker" />
            </Link>
          </a>
       </div>   
        <div >          
          <a><Link className='text-decoration-none text-white px-4' to="view">View all</Link></a>
          <a><Link className='text-decoration-none text-white px-4' to="form">+ New Transaction</Link></a>
        </div>
       
        <div>
        {currentUser ? (
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link  to={"login"} className='text-decoration-none text-white px-4' onClick={logOut}>
                Logout
              </Link>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ms-auto flex">
            <li className="nav-item">
              <Link to={"login"} className='text-decoration-none text-white px-4'>
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"signup"} className='text-decoration-none text-white px-4'>
                Sign up
              </Link>
            </li>
          </div>
        )}
        </div>

      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

}

export default App;
