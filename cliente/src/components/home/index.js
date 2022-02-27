import React, { useEffect, useState } from 'react';
import Info from './Info';
import Axios from 'axios';
import './home.css';
import Card from './Card';

const Home = (props) => {
    
    const homeUrl ='http://localhost:5000/api/home';

    const [data ,setData]  =useState({}); 
    
    const fetchdata = ()=>{ 
      Axios({
        url: homeUrl,
      })
        .then((response) => {
          setData(response.data);
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
      <div>
        <Info mont= { Total} />     
        <p> Total  Incomes ${Incomes} - Total Outcomes ${Outcome}  </p>
        
        <h3> Last 10 transacction </h3>

        <div className='container'>
          <div className='mx-auto d-flex flex-wrap ' > 
            {
              top10?.map( (item,index) =>
              <li className='d-flex w-30' key={index}>
                <Card item={item} />
              </li>
                
              )
            } 
            </div>
          </div>
        </div>     
    </div>
  )

};

export default Home;
