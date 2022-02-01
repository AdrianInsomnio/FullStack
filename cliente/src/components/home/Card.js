import React, { useState } from 'react';
import { stack} from 'bootstrap';
import'./card.css';
import { Link } from 'react-router-dom';

const Card = ({item}) => {
    const [datos ,setDatos]= useState(item)
    const { concepto, monto,idoperacion,fecha,tipo } = datos;
    var isIncome = tipo === "I";
    const handleUpdate= () =>{
      console.log(idoperacion);
      alert(`Update ${idoperacion}`);

    };
    const handleErase=(e) =>{
      alert("Erase ",idoperacion);
    };
  return <div className='card mx-1 my-2 ' style={{ width : "16rem" }} key={idoperacion}>
      <p className='card-title'>{concepto }</p>   
      <p className='text-muted'>Amount $ {monto} </p> 
      { isIncome? <div><p className='bg-success mx-2'>tipo : Income </p></div>  :
                  <div><p className="bg-danger mx-2">tipo :  Outcome `</p> </div> }  
      <div className='hstack m-3 ' >
        <button className= ' text-white btn btn-primary'
          onClick={handleUpdate}  
          >
            <Link className=' text-white text-decoration-none ' to={`/update/${idoperacion}`} >Update</Link>
        </button>
        <button className='btn btn-danger text-white'
          onClick={handleErase} 
          > Erase 
        </button>
      </div>
  </div>;
};

export default Card;