import './App.css';
import Home from './components/home';
import {
  Routes,
  Route,
  Link,
  Outlet
} from "react-router-dom";
import Views from './components/abm/Views';
import Form from './components/abm/Form';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="home" element={<Home />} />
          <Route path="view" element={<Views />} />
          <Route path="form" element={<Form />} />
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
        <Link to="form">+ New Transaction</Link>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

}

export default App;
