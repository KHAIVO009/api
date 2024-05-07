const axios = require('axios');
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;
const apiKey = 'j86bwkwo-8hako-12C';

app.get('/', (_, res) => {
    res.send('Hello world');
});

app.get('/ai', (req, res) => {
    const { ask } = req.query;
    if (!ask) return res.json({ error: 'Missing ask parameter' });
    axios.get('https://lianeapi.onrender.com/@unregistered/api/ai', {
        params: {
            key: apiKey,
            query: ask,
        }
    })
    .then(response => {
        res.json({ result: response.data.message });
    })
    .catch(error => {
        console.log(error);
        res.status(500).send('Internal Server Error');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

