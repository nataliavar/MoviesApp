import axios from 'axios';

const a = axios.create({
    baseURL : 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default a;