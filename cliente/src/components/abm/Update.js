import Axios from 'axios';
import { Alert } from 'bootstrap';
import React, { useEffect, useState } from 'react';
import { useForm  } from "react-hook-form";
import { useParams } from 'react-router-dom';

const Update = (props) => {

  const {Titulo="Update data" } = props;
  const params = useParams();
    /*
  const [detalle,setDetalle]=useState("");
  const[monto,setMonto]=useState("");
  const [optionsState,setOption]= useState("");
*/
const { register, formState: { errors }, reset, setValue, handleSubmit } = useForm( );
const [ operacion,setOperacion ]= useState({
  id:0,
  concepto:"",
  monto:0,
  tipo:""
});



const homeUrl ='http://localhost:5000/expenses/'
const fetchdata = ()=>{ 
  const {id} = params;
  
  Axios.get(homeUrl+params.id)
    .then((response) => {
      setOperacion(response.data[0]);
    })      
    .catch((error) => {
      console.log(error);
        });
      }


useEffect(() => {
  fetchdata();
}, []);
    

var urlUpdate= 'http://localhost:5000/expenses/update';

const onSubmit = (data,e) => {
  e.preventDefault();
  console.log(data);
  const post =  Axios.put(urlUpdate,data)
    .then(response => alert("Data recive"))
    reset();
  }
  const isIncome = operacion?.tipo ==="I";
  const handleChange = e =>{ 
    
    setOperacion(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  } 
  return <div className='container'>
    <h1>{Titulo}</h1>
    <form className='vstack d-grid gap-3 m-2' onSubmit={handleSubmit(onSubmit)} onReset={reset} >
      <label>Detail</label>
      <input type="text"  onChange={handleChange} value={operacion.concepto} />
        {errors.concepto?.type === 'required' && "Detail info is required"}
      <label >Amount</label>
      <input type="number" value={operacion.monto} onChange={handleChange} />
        {errors.monto?.type === 'required' && "Amount is required"}
      <label>{ isIncome? "INCOME": "OUTCOME" }</label>
      <input type="submit"/>
    </form></div>;
};

export default Update;
