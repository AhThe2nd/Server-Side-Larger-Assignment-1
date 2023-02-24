import express from 'express';

const app = express();
const port = 8000;

function stringToArray(actors){
    let actorsArray = actors.split(",");
    actorsArray.forEach(actor => {
      actor.trim();
    });
    return actorsArray;
  }

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send("Hello World!");
});

let movieData = {
    "movies" : [
        {
            "name" : "The Shawshank Redemption",
            "release_date" : "1994-09-22",
            "actors" : ["Morgan Freeman", "Tim Robbins", "Bob Gunton"],
            "poster" : "crime.png",
            "rating" : 5
        },

        {
            "name" : "Gigli",
            "release_date" : "2003-08-01",
            "actors" : ["Ben Affleck", "Jennifer Lopez"],
            "poster" : "romance.png",
            "rating" : 1
        }]};

app.get('/movies', (req, res) => {
    res.json( movieData );
});

app.post('/updateMovies', (req, res) => {
    // Need to convert actors string to array
    req.body.actors = stringToArray(req.body.actors);

    // Build new JSON to append to movie list

    movieData.movies.push(req.body);
    console.log(movieData);
    // res.send(req.body);
    res.redirect('/');
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});