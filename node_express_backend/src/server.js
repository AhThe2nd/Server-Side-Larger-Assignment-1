import express from 'express';
import path from 'path';
import { MongoClient } from 'mongodb';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../build')));
app.use(express.static(path.join(__dirname, '../posters')));

const upload = multer({ dest: 'posters/'});

app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
});

app.get('/api/movies', async (req, res) => {
    
    // Create client object and wait for connection
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();

    // Set database
    const db = client.db('movie_db');

    // Pull data from db and store
    const movieData = await db.collection('articles').find({}).toArray();
    res.json( movieData );
});

app.post('/api/updateMovies', upload.single('movie_poster'), async (req, res) => {

     // Create client object and wait for connection
     const client = new MongoClient('mongodb://127.0.0.1:27017');
     await client.connect();
     
     // Set database
    const db = client.db('movie_db');

    console.log("REQUEST LOG");
    console.log(req.body);

    // Insert to database
    const insertOperation = await db.collection('articles').insertOne({
        'name': req.body.name,
        'release_date': req.body.release_date,
        'actors':req.body.actors, 
        'poster': req.file.filename,
        'rating':req.body.rating
    });

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

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

function stringToArray(actors){
    let actorsArray = actors.split(",");
    actorsArray.forEach(actor => {
      actor.trim();
    });
    return actorsArray;
  }