import './App.css';
import {Link} from "react-router-dom";
import React, { useEffect, useRef, useState } from 'react';

function Header(props){
  return(
    <h1>{props.name}'s Incredible Movie Assignment</h1>
  )
}


function MovieList(props){
  return (
    <>
      {
        props.fav_movies.map((movie) => (
            <div>
              <hr></hr>
              <h2>{movie.name}</h2>
              <h3>Release Date: {movie.release_date}</h3>
              <h3>Starring: {displayActorsNames(movie.actors)}</h3>
              <img src={appendFilePath(movie.poster)} width={250}/>
              <h4>Rating: {movie.rating}/5 Stars</h4>
            </div>
          )
        )
      }
    </>    
  )
}

function displayActorsNames(actorsArray){
  let actorsNames = "";

  actorsArray.forEach(element => {
    actorsNames += element;
    if (actorsArray.indexOf(element) !== actorsArray.length - 1){
      actorsNames += ", "
    }
  });
  console.log(actorsNames);
  return actorsNames;
}

function appendFilePath(filename){
  let fullImagePath = "./images/";
  fullImagePath += filename;
  console.log(fullImagePath);
  return fullImagePath;
}

appendFilePath("test.png");

function MovieForm(){
  const txtMovieTitle = useRef();
  const txtReleaseDate = useRef();
  const txtActors = useRef();

  console.log(txtReleaseDate);
  const submit = (e) => {
    e.preventDefault();
  };
  return(
    <form onSubmit={submit} id="add_movie">
      <label>
        Enter movie name:
        <input ref={txtMovieTitle} type="text" name="title"/>
      </label><br /><br />

      <label>
        Choose release date: 
        <input ref={txtReleaseDate} type="date" name="date"/>
      </label><br /><br />

      <label>
        Enter actors: 
        <input ref={txtActors} type="text" name="actors" placeholder="ex: Morgan Freeman, Natalie Portman"/>
      </label><br /><br />

      <label>
        Select a poster: 
        <select name="poster" id="poster" form="add_movie">
          <option value="placeholder1">placeholder 1</option>
          <option value="placeholder2">placeholder 2</option>
          <option value="placeholder3">placeholder 3</option>
          <option value="placeholder4">placeholder 4</option>
          <option value="placeholder5">placeholder 5</option>
        </select>
      </label><br /><br />
      

      <label>
        Select a rating: 
        <select name="rating" id="rating" form="add_movie">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label><br /><br />
      
      <input type="submit" value="Add Movie"/><br /><br />
    </form>
  )
}

export function AddMovie(){
  return(
    <div>
      <h1>New Movie Review</h1>
      <Link to="/">Back to Movie List</Link><br /><br />
      <MovieForm></MovieForm>
    </div>
  )
}

export function ChangePage(){
  return(
    <nav>
      <Link to="/add-movie">Add New Movie</Link>
    </nav>
  )
}

export function Home(){
  return(
    <>
      <Header name="Andrew"></Header>
      <ChangePage></ChangePage>
    </>
  )
}

export function App(){

  let [data, setMovies] = useState(null);

  useEffect(() => {
    // Load movie data from JSON
    fetch("./movies.json")
    .then(response => response.json())
    .then(setMovies)
    .catch(e => console.log(e.message))
  }, [])

  if (data == null){
    return <h3>Loading movies...</h3>
  }

  // Convert movies to array
  let movies = data.movies;
  console.log(movies);

  return(
    <>
      <Home />
      <MovieList fav_movies={movies}/>
    </>
  )
}
