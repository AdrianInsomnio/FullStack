import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Form from './Form';
import Update from './Update';
import Swal from 'sweetalert2';
import {AiOutlineEdit,AiOutlineDelete} from 'react-icons/ai'


const Views = () => {
  const [list ,setList]= useState([]);
  const [title,setTitle]=useState("All");
  const [currentUser,setCurrentUser] =useState(undefined);
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const handleClose = () =>{ 
    setShow(false);
    all();
  };
  const handleShow = () =>{
    // me fijo si tiene permiso
    if (currentUser!==undefined){
      setShow(true);
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Do you already have an account?</a>'
      })
    }
     }
  const handleCloseUpdate = () => {
    setShowUpdate(false);
    all();
  };
  const handleshowUpdate = () => {
    
    if (currentUser!==undefined){
      setShowUpdate(true)
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Do you already have an account?</a>'
      })
    }


    
  };
  const [infoSelected,setInfoSelected] = useState({})


  const baseUrl1 ='http://localhost:5000/api/expenses/';
  const baseUrl2 ='http://localhost:5000/api/expenses/getIncomes';
  const baseUrl3 ='http://localhost:5000/api/expenses/getOutcomes';

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
    
    const handleUpdate= (item) =>{
      //save data - and close modal     
      setInfoSelected(item); 
      handleshowUpdate();
      
    };
    const handleErase= (data ,e) =>{
      const idErase = data.id;

      if (currentUser!==undefined){       
      
      Swal.fire({
        title: ` Do you want to remove \n"${data.concepto}" \n and save the changes?`,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Remove',
        denyButtonText: `Don't`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          //delete info
          const token = document.cookie.replace('token=','');
          const API_URL = "http://localhost:5000/api/expenses/transaction/";
          fetch(API_URL,
            {
              method :'DELETE',
              headers:{
                'Content-Type': 'application/json',
                'authorization': token
              },
              body : JSON.stringify( { "id" : idErase} ) 
            }).then( (res)=> res.json()).then(data=>{
              console.log(data)
              //setCurrentUser(data.user);
              const text =`Success data was remove` 
              Swal.fire(text, '', 'success')
              all();
            })
        


        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href="">Do you already have an account?</a>'
        })
      }



    };

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
        <button className="btn btn-primary mx-2 mt-2 " onClick={handleShow}>New transaction</button>
        <button className='btn btn-secondary mx-2 mt-2 ' onClick={all}>All Data</button>
        <button className='btn btn-secondary  mx-2 mt-2' onClick={incomes}>All Icomes</button>
        <button className='btn btn-secondary  mx-2 mt-2' onClick={outcome}>All Outcomes</button>
      </div>
      <h1 className='mt-4'>{title}</h1>
      <table className="table table-hover" >
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
            list?.map((item,index) => (
                <tr key={index} className='text-justify'>
                    <td className='align-middle'>{item.idoperacion}</td>
                    <td className='align-middle'>{item.concepto}</td>
                    <td className='align-middle'>{item.monto}</td>
                    <td className='align-middle'>{item.fecha}</td>
                    <td className='align-middle '>{ item.tipo === "INCOME" ? <p className='bg-success mx-2 text-white m-2 rounded text-center '> Incomes</p> : <p className='bg-secondary mx-2 text-white m-2 rounded text-center'>Outcome </p> }</td>
                    <td className='align-middle'>
                      <div className='hstack m-3 ' >
                        <button className= ' text-white btn btn-primary'  onClick={ ()=> handleUpdate(item)}> <AiOutlineEdit color="#fff" size={27} className='mx-2'/> Update </button>
                        <button className='btn btn-danger text-white m-2' onClick={ ()=> handleErase(item)}> <AiOutlineDelete color="#fff" size={27} className='mx-2'/> Remove</button>
                      </div>
                    </td>
                    <td/>
                </tr>
            ))
        }
              
         
        </tbody>
      </table>
    </div>
    <div>
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
              >
              <Modal.Header closeButton>
                <Modal.Title>Add new transacction</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form handleClose={handleClose} />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            <Modal
              show={showUpdate}
              onHide={handleCloseUpdate}
              backdrop="static"
              keyboard={false}
              >
              <Modal.Header closeButton>
                <Modal.Title>Update transacction</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Update info ={infoSelected} handleCloseUpdate={handleCloseUpdate} />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseUpdate}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            </div>
  </div>;
};

export default Views;
