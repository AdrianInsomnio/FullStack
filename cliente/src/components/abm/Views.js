import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Views = () => {
  const [list ,setList]= useState([]);
  const [update ,setUpdate] =useState(false);
  const [title,setTitle]=useState("All")

  const baseUrl1 ='http://localhost:5000/expenses/all';
  const baseUrl2 ='http://localhost:5000/expenses/getIncomes';
  const baseUrl3 ='http://localhost:5000/expenses/getOutcomes';

    const fetchdata = (baseUrl)=>{ 
      axios({
        url: baseUrl,
      })
        .then((response) => {
          setList(response.data);
          //console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

   const show_item_after_delete=(id)=>{
    //console.log('delete schedule data ')
      setTimeout(()=>{
        axios.get(baseUrl1).then(res=>res.data).
        then( data =>{setList(data.filter(item => item.idoperacion !==id));
            console.log('delete schedule data ',data)
    
        })
      },500)
    }



  const eliminar =(id) =>{
    let text = "Are you sure delete this data? \nCan't be undone!";
    //console.log(id);
    axios.delete("http://localhost:5000/expenses/remove/"+id).
    then(response =>{ 
     
      show_item_after_delete(id)
      //console.log(response)
    }
      )

  }

  useEffect(() => {
    fetchdata(baseUrl1);
  }, []);

  const all =()=>{
    fetchdata(baseUrl1);
    setTitle("All data")
  }
  const incomes=()=>{
    fetchdata(baseUrl2)
    setTitle("All incomes")
  }
  const outcome=()=>{
    fetchdata(baseUrl3)
    setTitle("All Outcomes")
  }

  return <div className='container'>

    <div className='' >
      <div className='mx-4'> 
        <button className='btn btn-secondary mx-2 mt-2 ' onClick={all}>All Data</button>
        <button className='btn btn-secondary  mx-2 mt-2' onClick={incomes}>All Icomes</button>
        <button className='btn btn-secondary  mx-2 mt-2' onClick={outcome}>All Outcomes</button>
      </div>
      <h1>{title}</h1>
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
                    <td>{ item.tipo === "I" ? <p className='bg-success'> Incomes</p> : <p className='bg-danger'>Outcome </p> }</td>
                    <td><button className='btn btn-primary'><Link className=' text-white text-decoration-none ' to={`/update/${item.idoperacion}`} >Update</Link></button>
                        <button className='btn btn-danger' onClick={()=> eliminar(item.idoperacion)}>delete</button></td>
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
