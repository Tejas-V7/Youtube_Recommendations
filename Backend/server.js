const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const moodREST_API = require('./routes/mood');
app.use('/mood', moodREST_API);

app.listen(PORT, () => {
    console.log(`Server is in ${PORT}`);
});

