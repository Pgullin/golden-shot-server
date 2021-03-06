const express = require('express'); //Import the express dependency
const bodyParser = require('body-parser');
const cors = require('cors');
const JSON = require('querystring');
const app = express();                    //Instantiate an express app, the main work horse of this server
const port = process.env.PORT || 3000     //Save the port number where your server will be listening

let goldenShots = [];

app.use(cors());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/goldenShot', (req, res) => {

goldenShots = [];
    const data = req.body;
    //res.setHeader('Content-Type', 'asplication/json');
    res.send("Data har uppdaterats");
    for(let i in data) {
        let tempShot = {
            name: data[i].name,
            score: data[i].score,
            distance: data[i].distance
        };
         goldenShots.push(tempShot);
     }
});


//Idiomatic expression in express to route and respond to a client request
app.get('/goldenShot', (req, res) => {        //get requests to the root ("/") will route here
    res.setHeader('Content-Type', 'application/json');
    goldenShots.sort((a, b) => (a.distance > b.distance) ? 1 : -1);
    res.send(goldenShots);  //server responds by sending the index.html file to the client's browser
});

app.listen(port, () => console.log(`Golden shot server listening on port ${port}!`));
