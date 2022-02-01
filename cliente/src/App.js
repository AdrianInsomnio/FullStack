import './App.css';
import Home from './components/home';
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

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
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
  return (
    <div>
     
      <nav className='navbar navbar-dark bg-dark '>
       <di>
         <a class="navbar-brand px-4">
           <Link className='text-decoration-none text-white ' to="Home">
             <Header  title="Expenses traker" />
            </Link>
          </a>
       </di>   
        <div >          
          <a><Link className='text-decoration-none text-white px-4' to="view">View all</Link></a>
          <a><Link className='text-decoration-none text-white px-4' to="form">+ New Transaction</Link></a>
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
