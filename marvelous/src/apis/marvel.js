import axios from 'axios';

const api_url = (process.env.NODE_ENV === 'production') ? 'https://marvel-land.herokuapp.com' : 'http://localhost:8000'
export default axios.create({
    baseURL: api_url
})