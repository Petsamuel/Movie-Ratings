import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";

import Form from "./form";
import API from "../api-services";

function MovieList() {
  // react-hooks
  const [movies, setMovies] = useState([]);
  const [SelectedMovie, setSelectedMovie] = useState([]);
  const [rateHover, setRateHover] = useState(-1);
  const [SelectedEditMovie, setSelectedEditMovie] = useState([]);
  const [token] = useCookies(["ps-cookies"]);

  // end of react hooks
  

  let updateRating = SelectedMovie.id;

  const higlightRate = (high) => (e) => {
    setRateHover(high);
  };
  const moviesUrls = "http://localhost:8000/movies/";

  useEffect(() => {
    fetch(moviesUrls, {
      Method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token['ps-cookies']}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setMovies(resp))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (!token['ps-cookies'] || token["ps-cookies"]==="undefined") window.location.href="/"
  }, [token]);

 
  function showLayout() {
    const main_section = document.querySelector(".main-section2");
    const selected_movie = document.querySelector(".selected-movie");
    const layout = document.querySelector(".starsLayout");
    layout.style.display = "block";
    const edit_form = document.querySelector(".edit-form");
    edit_form.style.display = "none";
    main_section.style.display = "block";
    selected_movie.style.display = "block";
  }
  function hideLayout() {
    const main_section = document.querySelector(".main-section2");
    const layout = document.querySelector(".starsLayout");
    const selected_movie = document.querySelector(".selected-movie");
    const edit_form = document.querySelector(".edit-form");
    layout.style.display = "none";
    selected_movie.style.display = "none";
    edit_form.style.display = "block";
    main_section.style.display = "block";
  }

  const MovieClicked = (movie) => (e) => {
    updatedRatings(movie);
    SelectedMoviesList();
    showLayout();
  };
  const updatedRatings = (resp) => {
    setSelectedMovie([]);
    setSelectedMovie(resp);
  };
  const updatedMovie = (props) => {
    const newMovies = movies.map((mov) => {
      if (mov.id === props.id) {
        return props;
      }
      return mov;
    });
    setMovies(newMovies);
  };
  const hoverClicked = (rate) => (e) => {
    fetch(`http://localhost:8000/movies/${updateRating}/rate_movie/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token['ps-cookies']}`
      },
      body: JSON.stringify({ stars: rate + 1 }),
    })
      .then(() => getDetails())
      .catch((error) => console.log(error));
  };
  const getDetails = () => {
    fetch(`http://localhost:8000/movies/${updateRating}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token['ps-cookies']}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => updatedRatings(resp))
      .catch((error) => console.log(error));
  };

  const RatingStar = () => {
    return (
      <div className="rate-container">
        <span className="rate-text">Rate it</span>
        <div className="rate-star">
          {[...Array(5)].map((e, index) => {
            return (
              <FontAwesomeIcon
                key={index}
                icon={faStar}
                className={rateHover > index - 1 ? "primary" : ""}
                onMouseEnter={higlightRate(index)}
                onMouseLeave={higlightRate(-1)}
                onClick={hoverClicked(index)}
              />
            );
          })}
        </div>
      </div>
    );
  };
  function StarLayout() {
    return (
      <React.Fragment>
        <FontAwesomeIcon
          icon={faStar}
          className={SelectedMovie.Avg_rating > 0 ? "orange" : ""}
        />
        <FontAwesomeIcon
          icon={faStar}
          className={SelectedMovie.Avg_rating > 1 ? "orange" : ""}
        />
        <FontAwesomeIcon
          icon={faStar}
          className={SelectedMovie.Avg_rating > 2 ? "orange" : ""}
        />
        <FontAwesomeIcon
          icon={faStar}
          className={SelectedMovie.Avg_rating > 3 ? "orange" : ""}
        />
        <FontAwesomeIcon
          icon={faStar}
          className={SelectedMovie.Avg_rating > 4 ? "orange" : ""}
        />
        ({SelectedMovie.Stars})
      </React.Fragment>
    );
  }

  function SelectedMoviesList() {
    return (
      <div>
        <h3>{SelectedMovie.title}</h3>
        <p>{SelectedMovie.description}</p>
        <StarLayout />
      </div>
    );
  }

  const editFile = (movie) => {
    setSelectedEditMovie(movie);
    hideLayout();
  };

  const deleteFile = (movie) => {
    const newMovie = movies.filter((mov) => {
      if (mov.id === movie.id) {
        return (movie.id, false);
      }
      return true;
    });
    API.deleteMovie(movie.id, token['ps-cookies'])
      .then(() => {
        setMovies(newMovie);
      })
      .catch((error) => {
        console.log(error);
      });
    setMovies(newMovie);
  };

  const AddMovie = () => {
    setSelectedEditMovie({ title: "", description: "" });
    setSelectedMovie([]);
    hideLayout();
  };
  const newMovie = (movie) => {
    const newMov = [...movies, movie];
    setMovies(newMov);
  };

  return (
    <div className="App-main">
      <div className="App-movie-list">
        <div className="movie-list">
          <h3>Movie_List</h3>
          <span>
            {" "}
            <input type="button" value="Add Movie" onClick={AddMovie} />
          </span>
        </div>
        <div className="wrapper">
          {movies.map((movie) => {
            return (
              <div className="move-scroll" key={movie.id}>
                <div className="movie-flex">
                  <span onClick={MovieClicked(movie)} className="pointers">
                    {movie.title}
                  </span>
                  <span className="edit-container">
                    <FontAwesomeIcon
                      icon={faEdit}
                      onClick={() => {
                        editFile(movie);
                      }}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => {
                        deleteFile(movie);
                      }}
                    />
                  </span>
                
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="section2">
        <div className="App-movie-details">
          <h3>Movie_Details</h3>
          <div className="main-section2">
            <div className="selected-movie">
              <SelectedMoviesList />
            </div>
            <div className="starsLayout">
              <RatingStar />
            </div>

            <div className="edit-form">
              <Form
                movie={SelectedEditMovie}
                updatedMovie={updatedMovie}
                newMovie={newMovie}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieList;
