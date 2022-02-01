import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Views = () => {
  const [list ,setList]= useState([]);

  const baseUrl ='http://localhost:5000/expenses/all';

    const fetchdata = ()=>{ 
      axios({
        url: baseUrl,
      })
        .then((response) => {
          setList(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

  function eliminar(id) {
    myFunction();
  }
  function actualizar(id){
    let text = "Are you sure update this data? \n";
    if (window.confirm(text) == true) {
      
    } else {
      text = "You canceled!";
    }
  }

  function myFunction() {
    let text = "Press a button!\nEither OK or Cancel.";
    if (window.confirm(text) == true) {
      alert("Delete press");

    } else {
      text = "You canceled!";
    }
  }

  useEffect(() => {
    fetchdata();
  }, []);
  

  return <div className='container'>
    <div className='' >
      <h1>All data</h1>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th scope="col">Date</th>
            <th scope="col">Type</th>
            <th scope="col">Acction</th>
          </tr>
        </thead>
        <tbody>
        {
            list?.map((item) => (
                <tr key={item.idoperacion}>
                    <td>{item.idoperacion}</td>
                    <td>{item.concepto}</td>
                    <td>{item.monto}</td>
                    <td>{item.fecha}</td>
                    <td>{ item.tipo == "I" ? <p className='bg-success'> Incomes</p> : <p className='bg-danger'>Outcome </p> }</td>
                    <td><button onClick={actualizar}><Link className=' text-white text-decoration-none ' to={`/update/${item.idoperacion}`} >Update</Link></button>
                        <button onClick={eliminar}>delete</button></td>
                    <td/>
                </tr>
            ))
        }
              
         
        </tbody>
      </table>
    </div>
  </div>;
};

export default Views;
