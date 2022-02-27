import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Swal from 'sweetalert2';

const Signup = () => {
  const [nombre, setNombre] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const API_URL_REGISTRER = "http://localhost:5000/api/users/register";

const signup = (nombre,userName, password) => {
  return axios
    .post(API_URL_REGISTRER, {
      nombre,
      userName,
      password,
    })
    .then((response) => {
      //console.log("SignUp "+response.data);
      
      if (response.data.success) {        
        localStorage.setItem("user", JSON.stringify(response.data.success));
      }
      return response.data;
    });
};





  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(nombre,userName, password).then(
        (response) => {
          // check for token and user already exists with 200
             console.log("Sign up successfully =>", response.data);
          if(response){

            navigate("/home");
            window.location.reload();
            Swal.fire(
              'Good job!',
              'You clicked the button!',
              'success'
            )
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: '<a href="">Why do I have this issue?</a>'
            })
          }
          
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container  ">
    <div className="">
      <div className="row ">
      <div className="col-md-3" >

      </div>
      <div className="col-md-6 shadow-3">
          <form className="d-flex flex-column mt-3 shadow p-3 mb-5 bg-white rounded"  onSubmit={handleSignup}>
        <h3 className="p-2">Sign up</h3>
        <label className="p-2">Full name</label>
        <input
        className="p-2"
          type="text"
          placeholder="Full name"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
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
        <button  className="p-2 mt-4 btn btn-primary" type="submit">Sign up</button>
      </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
