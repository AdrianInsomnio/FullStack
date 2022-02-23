import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import Swal from 'sweetalert2';

const Signup = () => {
  const [nombre, setNombre] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await authService.signup(nombre,userName, password).then(
        (response) => {
          // check for token and user already exists with 200
             //console.log("Sign up successfully =>", response.data);
          if(response.AuthStatus){
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
    <div className="container">
      <form onSubmit={handleSignup}>
        <h3>Sign up</h3>
        <input
          type="text"
          placeholder="Name"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default Signup;
