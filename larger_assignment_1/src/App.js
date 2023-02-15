import './App.css';
import Movies from './movies.json';
import {Link} from "react-router-dom";
import { useRef } from 'react';

function Header(props){
  return(
    <h1>{props.name}'s Incredible Movie Assignment</h1>
  )
}


function MovieList(props){
  return (
    <ul>
      {
        props.fav_movies.map((movie, i) => (
          <ul key={i}>
          <li>{movie.name}</li>
          <li>{movie.release_date}</li>
          <li>{movie.actors}</li>
          <li>{movie.poster}</li>
          <li>{movie.rating}</li>
      </ul>
        )
        )
      }
    </ul>
  )
}

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
      <MovieForm></MovieForm>
      <Link to="/">Submit Movie</Link>
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
      <MovieList fav_movies={Movies.movies}></MovieList>
      <ChangePage></ChangePage>
    </>
  )
}

export function App(){
  return(
    <>
      <Home />
    </>
  )
}
