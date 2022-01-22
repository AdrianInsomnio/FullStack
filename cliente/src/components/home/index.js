import React, { useEffect, useState } from 'react';
import Header from './Header';
import Info from './Info';
import Axios from 'axios';

const Home = (props) => {
    const [ total, setTotal]= useState(0);
    const [list,setList]= useState([]);

    const baseUrl ='http://localhost:5000/users';
    

    useEffect(() => {
      Axios({
        url: baseUrl,
      })
        .then((response) => {
          setList(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);


  return <div className="" style={ {textAlign:"center",background: "aqua"}}>
      <Header  title="Expenses traker" />
      <Info total= { total} />
      <ul>
      {list.map((item) => (
          <div key={item.id}>
            <h3>{item.nombre}</h3>
            <p>{item.pass}</p>
          </div>
        ))}
      </ul>
     
  </div>;
};

export default Home;
