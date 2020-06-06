let axios = require('axios');
let md5 = require('md5');
var marvelCredentials = require('../marvelCredentials.json');


const public = marvelCredentials.public;
const private = marvelCredentials.private;

let marvel = axios.create({
    baseURL: 'http://gateway.marvel.com/v1/public/',
});

marvel.interceptors.request.use((config) => {
    const ts = new Date().valueOf();
    const hash = md5(ts.toString() + private + public)
    return {
        ...config,
        params: {
            ...config.params,
            ts: ts,
            apikey: public,
            hash: hash
        }
    }
})

module.exports = marvel;