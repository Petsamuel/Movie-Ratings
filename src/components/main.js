import React, { useState, useEffect } from "react";


function Movie_List() {
  const [movies, setmovies] = useState([]);
  const [SelectedMovie, setSelectedMovie]=useState(null)

  const  moviesUrls = "http://localhost:8000/movies/"
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Token 3dca8f95a03d20532dd21f44bb4eed734dc137ac',
  })
  useEffect(() => {
    fetch(moviesUrls, {
      Method: "GET", headers })
      .then((resp) => resp.json())
      .then((resp) => setmovies(resp))
      .catch((error) => console.log(error));
  }, []);

 const MovieClicked=(movie)=> (e)=>{
  setSelectedMovie(movie);
 }

  return (
    <div className="App-layout">
      <div className="App-movie-list">
        <h3>Movie_List</h3>
        <div>
          {movies.map((movie) => {
            return (
              <div key={movies.id}>
                <h3 id="user" onClick={MovieClicked(movie)}>{movie.title}</h3>
              </div>
            );
          })}
        </div>
      </div>
      
    </div>
  );
}

function Movie_Details(){
  // const [movieDetails, setmovieDetails]= useState([]);
  // const movieDetailsUrl="http://localhost:8000/movies/"
  // const headers = new Headers({
  //   'Content-Type': 'application/json',
  //   'Authorization': 'Token 3dca8f95a03d20532dd21f44bb4eed734dc137ac',
  // })
  // useEffect(()=>{
  //   fetch(movieDetailsUrl, {
  //     Method: "Get", headers})
  //     .then((resp)=> resp.json())
  //     .then((resp)=>setmovieDetails(resp))
  //     .catch((error)=> error.log(error))
      
  // }, []);

//   return(
//     <div>
//     <h3 className="App-movie-details">Movie-Details</h3>
//      <div key={movieDetails.id}>
//       {movieDetails.map((index)=>{
//         return(
//           <div>
//           <h3>
//             {index.description}
//           </h3>
//         </div>
//         )
//       })}
//      </div>
        
//     </div>
//   )


 }


export {Movie_List, Movie_Details};
