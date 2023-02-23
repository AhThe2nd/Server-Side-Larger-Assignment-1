import './App.css';
import {Link} from "react-router-dom";
import React, { useEffect, useRef, useState } from 'react';
import {Routes, Route} from "react-router";

function Header(props){
  return(
    <h1>{props.name}'s Incredible Movie Assignment</h1>
  )
}


function Home(props){
  const [list, setList] = React.useState(props.fav_movies);

  function removeMovie(name){
    console.log("remove movie function fired!")
    const newList = list.filter((movie) => movie.name !== name);
    console.log(newList);
    setList(newList);

    // Remove entry from props list
    props.fav_movies.forEach(movie => {
      console.log(name);
      console.log(movie.name);
      if (movie.name == name){
        const index = props.fav_movies.indexOf(movie);
        console.log(index);
        props.fav_movies.splice(index, 1);
      }
    })
    console.log(props.fav_movies)
  }

  return (
    <>
    <NavBar/>
      {
        list.map((movie) => (
            <div key={movie.name}>
              <hr></hr>
              <h2>{movie.name}</h2>
              <h3>Release Date: {movie.release_date}</h3>
              <h3>Starring: {displayActorsNames(movie.actors)}</h3>
              <img src={appendFilePath(movie.poster)} width={250}/>
              <h4>Rating: {movie.rating}/5 Stars</h4>
              <button type="button" onClick={() => removeMovie(movie.name)}>Remove</button>
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
  return actorsNames;
}

function appendFilePath(filename){
  let fullImagePath = "./images/";
  fullImagePath += filename;
  return fullImagePath;
}

function stringToArray(actors){
  let actorsArray = actors.split(",");
  actorsArray.forEach(actor => {
    actor.trim();
  });
  return actorsArray;
}

function MovieForm(props){
  const [list, setList] = React.useState(props.fav_movies);
  const txtMovieTitle = useRef();
  const txtReleaseDate = useRef();
  const txtActors = useRef();
  const txtPoster = useRef();
  const txtRating = useRef();

  const submit = (e) => {
    e.preventDefault();

    // Get values for object literal
    const newTitle = txtMovieTitle.current.value;
    const newReleaseDate = txtReleaseDate.current.value;
    const newActors = txtActors.current.value;
    const newPoster = txtPoster.current.value;
    const newRating = txtRating.current.value;

    // Create object literal and add to list of movies
    var newMovie = {
      name: newTitle,
      release_date: newReleaseDate,
      actors: stringToArray(newActors),
      poster: newPoster,
      rating: newRating
    }
    alert("Movie review added!")
    list.push(newMovie);

    // Reset values
    txtMovieTitle.current.value = "";
    txtReleaseDate.current.value = "";
    txtActors.current.value = "";
    txtPoster.current.value = "";
    txtRating.current.value = "";
    
  };
  return(   
    <form onSubmit={submit}>
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
        <select ref={txtPoster} name="poster" id="poster" form="add_movie">
          <option value="adventure.png">Adventure</option>
          <option value="animation.png">Animation</option>
          <option value="comedy.png">Comedy</option>
          <option value="crime.png">Crime</option>
          <option value="drama.png">Drama</option>
          <option value="historical.png">Historical</option>
          <option value="horror.png">Horror</option>
          <option value="musical.png">Musical</option>
          <option value="mystery.png">Mystery</option>
          <option value="romance.png">Romance</option>
          <option value="scifi.png">Science Fiction</option>
          <option value="war.png">War</option>
          <option value="western.png">Western</option>
        </select>
      </label><br /><br />
      

      <label>
        Select a rating: 
        <select ref={txtRating} name="rating" id="rating" form="add_movie">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label><br /><br />
      <button>Add Movie</button>
    </form>
  )
}

// Navigation Bar Component
export function NavBar(){
  return(
    <nav>
      <Link to="/">Movie List</Link>
      <Link to="/add-movie">Add New Movie</Link>
    </nav>
  )
}

function AddMovieHeader(){
  return(
    <h1>New Movie Review Form</h1>
  )
}

// Router pages
export function AddMovie(props){
  return(
    <div>
      <NavBar/>
      <AddMovieHeader/>
      <MovieForm fav_movies={props.fav_movies}/>
    </div>
  )
}

// App
export default function App(){

  let [movies, setMovies] = useState(null);

  useEffect(() => {
    // Load movie data from JSON
    fetch("/movies")
    .then(response => response.json())
    .then(setMovies)
    .catch(e => console.log(e.message))
  }, [])

  if (movies == null){
    return <h3>Loading movies...</h3>
  }

  console.log(movies);
  // Convert movies to array
  movies = movies.movies;
  console.log(movies);

  return(
    <>
      <Routes>
        <Route path="/" element={<Home fav_movies={movies} />} />
        <Route path="/add-movie" element={<AddMovie fav_movies={movies} />} />
      </Routes>
    </>
      
  );
}