import './App.css';
import {Link} from "react-router-dom";
import React, { useEffect, useRef, useState } from 'react';
import {Routes, Route} from "react-router";
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import FormSelect from 'react-bootstrap/FormSelect'
import 'bootstrap/dist/css/bootstrap.min.css';

function Header(props){
  return(
    <h1>{props.name}'s Incredible Movie Assignment</h1>
  )
}


function Home(props){
  const [list, setList] = React.useState(props.fav_movies);


  function removeMovie(movie, name){
    
    // This function now sends the data of the movie to be removed to the database
    fetch('/removeMovie', {
      method:'POST',
      body: JSON.stringify(movie),
      headers: {'Content-Type':'application/json'}
    });
    
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
            <div class="container">
              <hr/>
              <div class="row">
                <div class="col-sm">
                  <h2>{movie.name}</h2>
                  <h3>Release Date: {movie.release_date}</h3>
                  <h3>Starring: {movie.actors}</h3>
                  <h4>Rating: {movie.rating}/5 Stars</h4>
                  <Button variant="danger" type="button" onClick={() => removeMovie(movie, movie.name)}>Remove</Button>
                </div>
                <div class="col-sm">
                  <img src={movie.poster} width={250}/>
                </div>
              </div>
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
    list.push(newMovie);

    // Reset values
    txtMovieTitle.current.value = "";
    txtReleaseDate.current.value = "";
    txtActors.current.value = "";
    txtPoster.current.value = "";
    txtRating.current.value = "";
    
  };
  return( 
    <Container>
      <hr/>
      <Row>
        <Col></Col>
        <Col>
        <AddMovieHeader className='justify-content-center'/> </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col></Col>
        <Col>
        <Form method="post" action="/api/updateMovies" enctype="multipart/form-data">
        <Form.Group>
          <Form.Label>Enter movie name:</Form.Label>
          <Form.Control ref={txtMovieTitle} type="text" name="name"/>
        </Form.Group><br/>

        <Form.Group>
          <Form.Label>Choose release date: </Form.Label>
          <Form.Control ref={txtReleaseDate} type="date" name="release_date"/>
        </Form.Group><br/>

        <Form.Group>
          <Form.Label>Enter actors:</Form.Label> 
          <Form.Control ref={txtActors} type="text" name="actors" placeholder="ex: Morgan Freeman, Natalie Portman"/>
        </Form.Group><br/>

        <Form.Group>
          <Form.Label>Upload a poster: </Form.Label>
          <Form.Control type="file" name="movie_poster"/>
        </Form.Group><br/>
      
        <Form.Group>
          <Form.Label>Select a rating: </Form.Label>
            <FormSelect ref={txtRating} name="rating" id="rating">
              <option value="1" name="1">1</option>
              <option value="2" name="2">2</option>
              <option value="3" name="3">3</option>
              <option value="4" name="4">4</option>
              <option value="5" name="5">5</option>
            </FormSelect>
        </Form.Group><br /><br />
      
      <Button className='justify-content-center' variant='success' type="submit" value="submit">Add Movie</Button>
    </Form></Col>
        <Col></Col>
      </Row>
    </Container>


    
  )
}

// Navigation Bar Component
export function NavBar(){
  return(
    <Nav className="justify-content-center fs-2" activeKey="/">
      <Nav.Item>
        <Nav.Link href="/">Movie List</Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link href="/add-movie">Add New Movie</Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

function AddMovieHeader(){
  return(
    <h4 >New Movie Review Form</h4>
  )
}

// Router pages
export function AddMovie(props){
  return(
    <div>
      <NavBar/>
      <MovieForm fav_movies={props.fav_movies}/>
    </div>
  )
}

// App
export default function App(){

  let [movies, setMovies] = useState(null);

  useEffect(() => {
    // Load movie data from JSON
    fetch("/api/movies")
    .then(response => response.json())
    .then(setMovies)
    .catch(e => console.log(e.message))
  }, [])

  if (movies == null){
    return <h3>Loading movies...</h3>
  }

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