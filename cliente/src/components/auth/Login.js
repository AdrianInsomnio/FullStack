import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Swal from 'sweetalert2';

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const data ={ userName, password };

  const navigate = useNavigate();
  const API_URL_LOGIN = "http://localhost:5000/api/users/login";
  //const validData = { userName:!(userName?.length), password :!(password?.length)};
  //setErrors(validData);
  const handleLogin = async (e) => {
    e.preventDefault();
    //setErrors(validData);
      //if (!validData.userName && !validData.password){
        fetch(API_URL_LOGIN ,{
          method :'POST',
          headers : {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify( data )
        }).then( res=> res.json()).then( (cred)=>{
          document.cookie = `token=${cred.token}; max-age=${60*3}; path=/; samesite=strict`;
          Swal.fire(
            'Good job!',
            'You clicked the button!',
            'success'
          )
          navigate("/view");
          window.location.reload();
        })

  };

  return (
        
    <div className="container">
    <div className="">
      <div className="row ">
      <div className="col-md-3" >

      </div>
      <div className="col-md-6 ">
        <form className="d-flex flex-column mt-3 shadow p-3 mb-5 bg-white rounded" onSubmit={handleLogin}>
          <h3 className="p-2">Login</h3>
          <label className="p-2">Email adress</label>
          <input
          className="p-2"
            type="text"
            placeholder="email"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <label className="p-2">Password</label>
          <input
          className="p-2"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button  className="p-2 mt-4 btn btn-primary" type="submit">Log in</button>
        </form>
      </div>



      </div>
      
    </div>
    </div>
  );
};

export default Login;
