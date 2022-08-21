import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function Movie_List() {
  // hooks 
  const [movies, setmovies] = useState([]);
  const [SelectedMovie, setSelectedMovie] = useState([]);
  const [rateHover, setRateHover] = useState(-1);
  const higlightRate = high => (e) => {
    setRateHover(high)
  }
  // end of react hooks 

  const moviesUrls = "http://localhost:8000/movies/";
  const headers = new Headers({
    "Content-Type": "application/json",
    "Authorization": "Token 3dca8f95a03d20532dd21f44bb4eed734dc137ac",
  });
  useEffect(() => {
    fetch(moviesUrls, {
      Method: "GET",
      headers,
    })
      .then((resp) => resp.json())
      .then((resp) => setmovies(resp))
      .catch((error) => console.log(error));
  }, []);

  function showLayout() {
    var layout = document.querySelector(".starsLayout")
    layout.style.display = "block"

  }

  const MovieClicked = (movie) => (e) => {
    setSelectedMovie(movie);

    showLayout()
  };
const  mov =SelectedMovie.id

  // http://localhost:8000/ratings/
  const hoverClicked = rate => (e) => {
    fetch(`http://localhost:8000/movies/${mov}/rate_movie/`, {
      method: "POST",
      headers,
      body: JSON.stringify({ stars: rate + 1 })
    }).then((resp) => resp.json())
      .then((resp) => console.log(resp))
      .catch((error) => console.log(error));
  }

  return (
    <div className="App-main">
      <div className="App-movie-list">
        <h1>Movie_List</h1>
        <div>
          {movies.map(movie => {
            return (
              <div key={movie.id}>
                <h3 onClick={MovieClicked(movie)}>
                  {movie.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
      <div className="section2">
        <div className="App-movie-details">
          <h1>Movie_Details</h1>

          <div>
            <h3>{SelectedMovie.title}</h3>
            <p>{SelectedMovie.description}</p>
            <div className="starsLayout">
              <FontAwesomeIcon icon={faStar} className={SelectedMovie.Avg_rating > 0 ? "orange" : ""} />
              <FontAwesomeIcon icon={faStar} className={SelectedMovie.Avg_rating > 1 ? "orange" : ""} />
              <FontAwesomeIcon icon={faStar} className={SelectedMovie.Avg_rating > 2 ? "orange" : ""} />
              <FontAwesomeIcon icon={faStar} className={SelectedMovie.Avg_rating > 3 ? "orange" : ""} />
              <FontAwesomeIcon icon={faStar} className={SelectedMovie.Avg_rating > 4 ? "orange" : ""} />
              ({SelectedMovie.Stars})
              <div className="rate-container">
                <span>Rate</span>
                < div className="rate-star">
                  {
                    [...Array(5)].map((e, index) => {
                      return (
                        <FontAwesomeIcon key={index} icon={faStar} className={rateHover > index - 1 ? "primary" : ""}
                          onMouseEnter={higlightRate(index)}
                          onMouseLeave={higlightRate(-1)}
                          onClick={hoverClicked(index)}
                        />
                      )
                    })

                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movie_List;
