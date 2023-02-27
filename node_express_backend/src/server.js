import express from 'express';
import fs from 'fs';
import { MongoClient } from 'mongodb';

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

/*
let movieData = JSON.parse(fs.readFileSync('./movies.json'));
console.log(movieData);
*/

app.get('/movies', async (req, res) => {
    
    // Create client object and wait for connection
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();

    // Set database
    const db = client.db('movie_db');

    // Pull data from db and store
    const movieData = await db.collection('articles').find({}).toArray();
    res.json( movieData );
});

app.post('/updateMovies', async (req, res) => {

     // Create client object and wait for connection
     const client = new MongoClient('mongodb://127.0.0.1:27017');
     await client.connect();
     
     // Set database
    const db = client.db('movie_db');

    console.log("REQUEST LOG");
    console.log(req.body);

    // Insert to database
    const insertOperation = await db.collection('articles').insertOne(req.body);

    console.log("INSERT LOG");
    console.log(insertOperation);
    res.redirect('/');
});

app.post('/removeMovie', async (req, res) => {

    // Create client object and wait for connection
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    
    // Set database
   const db = client.db('movie_db');

   res.send(req.body);
   console.log("Next line is from the removeMovie method");
   // console.log(req.body);

   // Delete from database
   const deleteOperation = await db.collection('articles').deleteOne({"name" : req.body.name});
   console.log(deleteOperation);

});

const saveData = () => {
    const dataString = JSON.stringify(movieData);
    fs.writeFile('./movies.json', dataString, 'utf8', function (error){
        if (error){
            console.log("Error while writing JSON to file");
        }
        console.log("JSON file updated and saved!")
    });
}

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});