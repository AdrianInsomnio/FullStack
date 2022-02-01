import React, { useEffect, useState } from 'react';
import Header from './Header';
import Info from './Info';
import Axios from 'axios';
import './home.css';
import Card from './Card';


const Home = (props) => {
    //const [ total, setTotal]= useState(0);
    const [list,setList]= useState([]);
    const actualizar= true;

    const baseUrl ='http://localhost:5000/expenses/all';
    
    const homeUrl ='http://localhost:5000/home';

    const [data ,setData]  =useState({}); 
    

    const fetchdata = ()=>{ 
      Axios({
        url: homeUrl,
      })
        .then((response) => {
          setList(response.data.top10);
          setData(response.data);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    useEffect(() => {
      fetchdata();
    }, []);
    const { Total, Incomes , Outcome , top10 } = data;

  return (
    <div className="container" style={ {textAlign:"center"}}>
      <Info mont= { Total} />     
      <p> Total  Incomes ${Incomes} - Total Outcomes ${Outcome}  </p>
      
      <h3> Last 10 transacction </h3>
      <div className='container'>
      <div className='row row-cols-5 ' > 
        {
          console.log(top10)}
        {
          top10?.map( item =>
            <Card key={item.idoperacion} item={item} />
          )
        } 
      </div>
      </div>
     
    </div>
  )

};

export default Home;
