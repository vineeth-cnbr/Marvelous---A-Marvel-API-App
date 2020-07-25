import axios from 'axios';

const api_url = process.env.REACT_APP_API
export default axios.create({
    baseURL: api_url
})