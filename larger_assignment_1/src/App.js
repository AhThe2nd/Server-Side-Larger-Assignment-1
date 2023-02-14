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

function App(){
  return(
    <>
      <Header name="Andrew"></Header>
      <MovieList fav_movies={Movies.movies}></MovieList>
    </>
  )
}

export default App;
