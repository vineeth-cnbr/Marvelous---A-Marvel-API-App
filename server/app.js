var express = require("express");
var md5 = require("md5")
var app = express();
var path = __dirname + '/views/';
var bodyParser = require('body-parser');
var morgan = require('morgan')
var marvel = require('./api/marvel');
var _ = require('lodash')

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(morgan('tiny')) //logger
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.set('port', (process.env.PORT || 8000));
// app.use(express.static(__dirname + '/public'));


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
        console.log(error)
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
        console.log(error)
        res.send(error)
    })

});

app.get("/stories", (req, res) => {
    let page = req.query.page;
    if (Number.isNaN(page)) {
        page = 1;
    }
    marvel.get('series', { params: { limit: 18, offset: page * 18 } }).then(response => {
        let results = response.data.data.results.map(result => _.omit(result, ['comics', 'stories', 'events', 'series']));
        res.send(results)
    }).catch(error => {
        console.log(error)
        res.send(error)
    })

});



//For testing 
app.get("/events/name/:name", (req, res) => {

    marvel.get('events', { params: { nameStartsWith: req.params.name } }).then(response => {
        let results = response.data.data.results.map(result => _.omit(result, ['comics', 'stories', 'events', 'series']));
        res.send(results)
    }).catch(error => {
        console.log(error)
        res.send(error)
    })

});


app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});
