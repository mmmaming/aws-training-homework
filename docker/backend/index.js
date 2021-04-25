const express = require('express');
const app = express();
const port = 3001;

app.get('/users', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json({users: [
            {
                name: 'Tom'
            },
            {
                name: 'Jack'
            }
        ]});
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
