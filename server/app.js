var express = require("express");
var md5 = require("md5")
var app = express();
var path = __dirname + '/views/';
var bodyParser = require('body-parser');
var morgan = require('morgan')
var marvel = require('./api/marvel');
var _ = require('lodash');
// var server = require('http').createServer(app);
var quizSocket = require('./sockets/quizSocket');
const scores = require("./api/scores");
const { getGameScore, getHighScores } = require("./util/quizHelpers");

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Express server listening port
app.set('port', (process.env.PORT || 8000));
var server = app.listen(app.get('port'), () => {
    console.log("Node app is running on port", app.get('port'));
});
var io = require('socket.io')(server);

//Socket for quiz
var quizNamespace = io.of('/quiz');
quizNamespace.on('connection', quizSocket);

app.use(morgan('tiny')) //logger
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


app.set('views', path);
app.set('view engine', 'ejs');

app.get("/characters", (req, res) => {
    let page = req.query.page;
    if (Number.isNaN(page)) {
        page = 1;
    }
    marvel.get('characters', { params: { events: '238,314', limit: 18, offset: page * 18 } }).then(response => {
        let results = response.data.data.results.map(result => _.omit(result, ['comics', 'stories', 'events', 'series']));
        res.send(results)
    }).catch(error => {
        console.error(error)
        res.send(error)
    })

});


app.get("/events", (req, res) => {
    let page = req.query.page;
    if (Number.isNaN(page)) {
        page = 1;
    }
    marvel.get('events', { params: { limit: 18, offset: page * 18 } }).then(response => {
        let results = response.data.data.results.map(result => _.omit(result, ['comics', 'stories', 'series']));
        res.send(results)
    }).catch(error => {
        console.error(error)
        res.send(error)
    })

});

//Get the score of a game. Pass query as gameId
app.get('/score', (req, res) => {
    let gameId = req.query.gameId;
    if (!gameId) {
        res.sendStatus(500);
    }
    getGameScore(gameId).then(score => {
        res.send({ score })
    }).catch(error => {
        console.error(error);
    });
});

app.get('/highscores', (req, res) => {
    getHighScores().then(scores => {
        res.send({ scores })
    }).catch(error => {
        console.error(error);
        res.sendStatus(500);
    })
});

//For testing 
app.get("/events/name/:name", (req, res) => {

    marvel.get('events', { params: { nameStartsWith: req.params.name } }).then(response => {
        let results = response.data.data.results.map(result => _.omit(result, ['comics', 'stories', 'events', 'series']));
        res.send(results)
    }).catch(error => {
        console.error(error)
        res.send(error)
    })

});




