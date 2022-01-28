import React, { useState } from 'react';
import'./card.css';

const Card = ({item}) => {
    const { concepto, monto,idconcepto,fecha,tipo } = item;
    var isIncome = tipo === "I";
    const handleUpdate= () =>{
      console.log(idconcepto);
      alert(`Update ${idconcepto}`);
    };
    const handleErase=(e) =>{
      alert("Erase ",idconcepto);
    };
  return <div className='card-info' key={idconcepto}>
      <p>{concepto }</p>   
      <p>{ isIncome? `${monto} tipo : Income` : `${monto} tipo :  Outcome `  }</p>  
      <div >
        <button className='btn-update' > Update </button>
        <button className='btn-delete' > Erase </button>
      </div>
  </div>;
};

export default Card;