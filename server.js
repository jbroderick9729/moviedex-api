const express = require('express');
const morgan = require('morgan');
const MOVIEDEX = require('./movie-data-small.json')

const app = express();
app.use(morgan('dev'));

function handleGenreCountryVote(req, res) {
    const { genre, country, avg_vote } = req.query;
    let response = MOVIEDEX;

    if (genre) {
        response = response.filter(movie => movie.genre.toLowerCase().includes(genre.toLowerCase()));
    };

    if (country) {
        response = response.filter(movie => movie.country.toLowerCase().includes(country.toLowerCase()));
    };

    if (avg_vote) {
        response = response.filter(movie => movie.avg_vote >= Number(avg_vote));
    };

    res.json(response);
}

app.get('/movie', handleGenreCountryVote)

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})