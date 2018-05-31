const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.use('/', express.static(`${__dirname}/jsconfeu-2018-schedule`));

app.listen(port, err => {
    if (err) {
        throw err;
    }
    console.log(`Ready on http://localhost:${port}`);
});
