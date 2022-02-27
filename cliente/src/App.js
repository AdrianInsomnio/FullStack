import './App.css';
import Home from './components/home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import {
  Routes,
  Route,
  Link,
  Outlet
} from "react-router-dom";
import Views from './components/abm/Views';
import Form from './components/abm/Form';
import 'bootstrap/dist/css/bootstrap.css';
import Update from './components/abm/Update';
import Header from './components/home/Header';
import { useEffect, useState } from 'react';

import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import {GiPayMoney} from 'react-icons/gi'

import './navbar.css';

function App() {
  return (
    <div className="App">
      <div  className="">
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

    </div>
  );

  
function Layout() {
  const [currentUser,setCurrentUser] =useState(undefined);
  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(()=>{ 
      const token = document.cookie.replace('token=','');
      const API_URL = "http://localhost:5000/api/expenses/prueba";
      fetch(API_URL,
        {
          method :'POST',
          headers:{
            'authorization': token
          }
        }).then( (res)=> res.json()).then(data=>{
          //console.log(data)
          setCurrentUser(data.user);

        })
  }
  ,[] );

  const logOut=()=> {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setCurrentUser(undefined)
  }

  return (
    <div>
     
      <nav className='navbar navbar-dark gradient__bg '>
       <div className='d-flex'>
          <GiPayMoney color="#fff" size={27} className='mx-4' />
          <Link className='text-decoration-none text-white ' to="Home">
             <Header  title="Expenses traker" />
          </Link>
       </div>   
        <div className="gpt3__navbar-links">
        <div className="gpt3__navbar-links_container align-items-center ">         
          <Link className='text-decoration-none text-secondary text-center px-4' to="view">View all</Link>
        </div>
      </div>
      <div className="gpt3__navbar-sign">
      {currentUser ? (
                      <div className="navbar-nav ms-auto">
                        <li className="nav-item inline bg-secondary rounded mx-2">
                          
                          <Link  to={"login"} className='text-decoration-none text-white px-4 ' onClick={logOut}>
                          <p className='text-white'>{currentUser.userName}</p>
                            <p>Logout</p>
                          </Link>
                        </li>
                      </div>
                      ) : ( 
                      <div>
                      <Link to={"login"} className='text-decoration-none text-white px-4'>Sign in</Link>
                                <button type="button"><Link to="signup" className='text-decoration-none text-white'>Sign up</Link></button>
                      </div>
                      )
        }
        </div>

        <div className="gpt3__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
        <div className="gpt3__navbar-menu_container scale-up-center">
          <div className="gpt3__navbar-menu_container-links">
            <Link className='text-decoration-none text-white px-4' to="view">View all</Link>
          </div>
          <div className="gpt3__navbar-menu_container-links-sign">
            <p>Sign in</p>
            <button type="button">Sign up</button>
          </div>
        </div>
        )}
      </div>
      </nav>
      <div className="container ">
        <Outlet />
      </div>
    </div>
  );
}

}

export default App;
