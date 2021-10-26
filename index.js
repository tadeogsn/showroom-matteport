const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'public')))

// ...
app.get('/bundle', (req, res) => {
    // res.sendFile(`${__dirname}/public/index.html`);
    res.sendFile(`${__dirname}/public/index-bundle.html`);
});

// ...
app.listen(8000, () => {
    console.log('Application listening on port 8000!');
});

