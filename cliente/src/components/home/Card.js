import React, { useState } from 'react';
import'./card.css';

const Card = ({item }) => {
    const [datos]= useState(item)
    const { concepto, monto,tipo } = datos;
    var isIncome = tipo === "INCOME";
  return <div className='card mx-1 my-2 bg-light' style={{ width : "16rem" }} >
      <p className='card-title'>{concepto }</p>   
      <p className='text-muted'>Amount $ {monto} </p> 
      { isIncome? <div><p className='bg-success mx-2 text-white m-2 rounded'>Income</p></div>  :
                  <div><p className="bg-danger mx-2 text-white m-2 rounded">Outcome</p> </div> }
  </div>;
};

export default Card;