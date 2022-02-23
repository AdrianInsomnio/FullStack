import axios from 'axios';
import { Alert } from 'bootstrap';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import authService from '../../services/auth.service';

const Form = (props) => {

  const {Titulo="New" } = props;
  const { register, formState: { errors }, reset, handleSubmit } = useForm( {
    defaultValues: {
    concepto: '',
    monto: '1',
    tipo:'INCOME'
  }
} );

const [currentUser,setCurrentUser] =useState(undefined);


useEffect(()=>{ 
  const user = authService.getCurrentUser();
  if (user){
    console.log(user);
    setCurrentUser(user);
  }
}
,[]  );

function authHeader() {
  // return authorization header with basic auth credentials
  let user = JSON.parse(currentUser);

  if (user && user.token) {
      return { Authorization: `Bearer ${user.token}` };
  } else {
      return {};
  }
}


var urlPost= 'http://localhost:5000/api/expenses/transaction';

const onSubmit = (data,e) => {
  //console.log(data);
  data.usuarioId = currentUser.id;

  axios.post(urlPost,data, {headers: authHeader()})
    .then(response => alert("Data recive"))
    reset()
  }
  return <div className='container'>
    <h1>{Titulo}</h1>
    <form className='vstack d-grid gap-3 mx-2' onSubmit={handleSubmit(onSubmit)} onReset={reset} >
      <label>Detail</label>
      <input className='mx-2' {...register("concepto", { required: true, maxLength: 50 })} />
        {errors.concepto?.type === 'required' && "Detail info is required"}
      <label >Amount</label>
      <input className='mx-2' type="number" {...register("monto", { required:true , min: 1})} />
        {errors.monto?.type === 'required' && "Amount is required"}
      <label>Select Income or outcome</label>
      <select {...register("tipo")}>
        <option value ="INCOME">Income</option>
        <option value ="OUTCOME">Outcome</option>
      </select>
      {errors.tipo?.type === 'required' && "Select income is required"}
      <input type="submit"/>
    </form></div>;
};

export default Form;
