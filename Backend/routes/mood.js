const express = require('express');
const axios = require('axios');
const Sentiment = require('sentiment');
const router = express.Router();
require('dotenv').config();
const sentiment = new Sentiment();

function detectMood(text) {
    const score = sentiment.analyze(text).score;
    if (score > 2) {
        return 'happy';
    }
    if (score < -2){
         return 'sad';
    }
    return 'neutral';
}

router.post('/', async (req, res) => {
    const mood = detectMood(req.body.text);
    const YOUTUBE_API_KEY = process.env.API_KEY;

    const query ={
        happy: 'Anuv jain happy songs',
        sad: 'Anuv jain songs',
        neutral: 'Galipata Songs'
    }

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query[mood]}&key=${YOUTUBE_API_KEY}&type=video&maxResults=5`
    const response = await axios.get(url);
    res.json(response.data.items);
});
module.exports = router;