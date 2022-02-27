import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";

const Form = (props) => {

  const {Titulo="New",handleClose } = props;
  const { register, formState: { errors }, reset, handleSubmit } = useForm( {});

const [currentUser,setCurrentUser] =useState(undefined);


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
        setCurrentUser(data.user)
      })
}
,[]  );


var urlPost= 'http://localhost:5000/api/expenses/transaction';

const onSubmit = (data,e) => {
  data.usuarioId = currentUser.id;
  
  const token = document.cookie.replace('token=','');

  fetch(urlPost,
    {
      method :'POST',
      headers:{
        'Content-Type': 'application/json',
        'authorization': token
      },
      body : JSON.stringify(data)
      ,
      
    }).then( (res)=> res.json()).then(dato=>{
      
      handleClose();
    })
    
  }

  return <div className='container'>    
    <h1>{Titulo}</h1>
    <form className='vstack d-grid gap-3 mx-2' onSubmit={handleSubmit(onSubmit)} onReset={reset} >
      <label>Detail</label>
      <input className='mx-2' {...register("concepto", { required: true, maxLength: 50 })} />
        {errors.concepto?.type === 'required' && <p className='text-danger'>Detail info is required</p>}
      <label >Amount</label>
      <input className='mx-2' type="number" {...register("monto", { required:true , min: 1})} />
        {errors.monto?.type === 'required' &&  <p className='text-danger'>Amount is required</p> }
      <label>Select Income or outcome</label>
      <select className='col-4 form-select form-select-lg mb-3 ' {...register("tipo")}>
        <option value ="INCOME"> Income</option>
        <option value ="OUTCOME">Outcome</option>
      </select>
      {errors.tipo?.type === 'required' && "Select income is required"}
      <input type="submit" className='btn btn-primary'/>
    </form></div>;
};

export default Form;
