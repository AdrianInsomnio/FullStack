import axios from 'axios';
import { Alert } from 'bootstrap';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";

const Form = (props) => {

  const {Titulo="New" } = props;
  const { register, formState: { errors }, reset, handleSubmit } = useForm( {
    defaultValues: {
    concepto: '',
    monto: '1',
    tipo:'I'
  }
} );

var urlPost= 'http://localhost:5000/expenses/create';

const onSubmit = (data,e) => {
  //console.log(data);
  axios.post(urlPost,data)
    .then(response => alert("Data recive"))
    
  }
  return <div className='col-md-6'>
    <h1>{Titulo}</h1>
    <form className='vstack d-grid gap-3 m-2' onSubmit={handleSubmit(onSubmit)} onReset={reset} >
      <label>Detail</label>
      <input {...register("concepto", { required: true, maxLength: 50 })} />
        {errors.concepto?.type === 'required' && "Detail info is required"}
      <label >Amount</label>
      <input type="number" {...register("monto", { required:true , min: 1})} />
        {errors.monto?.type === 'required' && "Amount is required"}
      <label>Select Income or outcome</label>
      <select {...register("tipo")}>
        <option value ="I">Income</option>
        <option value ="O">Outcome</option>
      </select>
      {errors.tipo?.type === 'required' && "Select income is required"}
      <input type="submit"/>
    </form></div>;
};

export default Form;
