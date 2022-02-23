import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import Swal from 'sweetalert2';

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await authService.login(userName, password).then(
        (response) => {


          console.log(response)
          if(response.AuthStatus){
            Swal.fire(
              'Good job!',
              'You clicked the button!',
              'success'
            )
            navigate("/home");
            window.location.reload();
           
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: '<a href="">Why do I have this issue?</a>'
            })
          }

         // navigate("/home");
         // window.location.reload();
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
      <form onSubmit={handleLogin}>
        <h3>Login</h3>
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
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default Login;
