import './App.css';
import Movies from './movies.json';

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

export function AddMovie(){
  return(
    <div>
      <h1>Form goes here</h1>
    </div>
  )
}

export function Home(){
  return(
    <>
      <Header name="Andrew"></Header>
      <MovieList fav_movies={Movies.movies}></MovieList>
    </>
  )
}

export function App(){
  return(
    <>
      <Home />;
    </>
  )
}
