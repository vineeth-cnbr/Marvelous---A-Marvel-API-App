var express = require('express');
var router = express.Router();
var marvel = require('../api/marvel');
/* GET home page. */
router.get('/random', async (req, res, next) => {

    try {
        let randomOffset = Math.floor((Math.random() * 57) + 1);
        let response = await marvel.get('characters', { params: { events: '29, 253', offset: randomOffset } })
        let results = response.data.data.results[0];
        res.send(results);
    } catch (error) {
        console.log(error)
        res.send(error);
    }
});

module.exports = router;
