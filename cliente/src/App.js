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
      <h1>Welcome to the app!</h1>
      <nav>
        <Link to="Home">Home</Link> |{" "}
        <Link to="view">View</Link> |{" "}
        <Link to="form">+ New Transaction</Link>|{" "}
        <Link to="update"> Update Transaction</Link>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

}

export default App;
