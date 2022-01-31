import React, { useState } from 'react';
import { stack} from 'bootstrap';
import'./card.css';

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
  return <div className='card-info' key={idoperacion}>
      <p>{concepto }</p>   
      <p>{ isIncome? `${monto} tipo : Income` : `${monto} tipo :  Outcome `  }</p>  
      <div className='hstack m-3 ' gap={2} >
        <button className= ' btn btn-primary btn-update mr-2'
          onClick={handleUpdate}  
          > Update 
        </button>
        <button className='btn btn-danger btn-delete'
          onClick={handleErase} 
          > Erase 
        </button>
      </div>
  </div>;
};

export default Card;