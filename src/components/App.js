import 'regenerator-runtime/runtime';
import React, { useState } from "react";
import './../styles/App.css';

const App = () => {
  const API_KEY="99eb9fd1"
  const [query,setQuery]=useState("");
  const [movies,setMovies]=useState([]);
  const [error,setError]=useState("");


  async function fetchData(){
      if(query.trim().length===0){
        setError('Invalid movie name.Please try again later');
        setMovies([]);
        return;
      }
    try {
      const response=await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
    
      const data=await response.json();
      setMovies(data.Search);
    } catch (error) {
      console.error('Error fetching data:', err);
      setError('Something went wrong. Please try again later.');
      setMovies([]);
    }
  }
  console.log(movies)
  return (
    <div>
        {/* Do not remove the main div */}
        <div style={{display:"flex",gap:"2vw"}}>
            <input type="text" value={query} onChange={(e)=>{setQuery(e.target.value)}}/>
            <button onClick={fetchData}>Search</button>
        </div>
        <div>
          {error&&<p style={{color:"red"}}>{error}</p>}
        </div>
        <div className="movieContainer">
          {
            movies.length>0&&movies.map((item,index)=>(
              <div key={index}>
                <h2>{item.Title}</h2>
                <img src={item.Poster}/>
              </div>
            ))
          }
        </div>
    </div>
  )
}

export default App
