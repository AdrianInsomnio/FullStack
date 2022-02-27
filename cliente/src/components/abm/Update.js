import Axios from 'axios';
import { Alert } from 'bootstrap';
import React, { useEffect, useState } from 'react';
import { useForm  } from "react-hook-form";
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Update = (props) => {

  const {Titulo="Update data" , handleCloseUpdate } = props;
  const params = useParams();
  const navigate = useNavigate();
  const [currentUser,setCurrentUser] =useState({});
const {  formState: { errors } } = useForm( );
const [ operacion,setOperacion ]= useState({});

const { id,concepto,monto,tipo }  = operacion;

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
      //console.log(data)
      setCurrentUser(data.user)
    })
}
,[]  );

const fetchdata = ()=> setOperacion(props.info);

useEffect(() => {fetchdata()}, []);
    

var urlUpdate= 'http://localhost:5000/api/expenses/transaction';

  const onSubmitd1 = (e) => {
    e.preventDefault();
    //console.log("data "+operacion);
    if (currentUser !== undefined ){
      const post =  Axios.put(urlUpdate ,operacion)
      .then(response => {
        Swal.fire(
          'Good job!',
          'You clicked the button!',
          'success'
        );
        handleCloseUpdate();  
      } ).catch(err => console.log(err));
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">User not looged</a>'
      })
    }

      
    }

  const isIncome = tipo ==="INCOME";

  const handleChange = e =>{    
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setOperacion(values => ({...values, [name]: value}))
  } 
  return <div className='container'>
    
    {
      //console.log(operacion)
    }
    <h1>{Titulo}</h1>
    <div className='row'>
      <form className='vstack d-grid gap-3 m-2 ' onSubmit={onSubmitd1}  >
        <label>Detail</label><label>{id}</label>
        <input type="text" name="concepto" value={concepto } onChange={handleChange} />
          {errors.concepto?.type === 'required' && "Detail info is required"}
        <label >Amount</label>
        <input type="number" name="monto" value={monto} onChange={handleChange} />
          {errors.monto?.type === 'required' && "Amount is required"}
        <label>{ isIncome? <p className='bg-success text-center text-white'>INCOME</p> : <p className='bg-secondary text-center text-white'>OUTCOME </p> }</label>
       
        <input type="submit" className='btn btn-primary' value="Save"/>
      </form>

    </div>
</div>;
};

export default Update;
