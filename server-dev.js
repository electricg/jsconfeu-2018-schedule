const express = require('express');
const next = require('next');
const fs = require('fs');

const _package = require('./package.json');
const { version } = _package;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
    .prepare()
    .then(() => {
        const server = express();

        // custom handlers go here…
        server.get('/sw.js', (req, res) => {
            // res.sendFile(`${__dirname}/src/static/js/sw.js`);
            const content = fs.readFileSync(
                `${__dirname}/src/static/js/sw.js`,
                'utf8'
            );
            const js = content.replace('@VERSION@', version);
            res.set('Content-Type', 'application/javascript');
            res.send(js);
        });

        server.get('/schedule', (req, res) => {
            res.set('Content-Type', 'text/html');
            res.sendFile(`${__dirname}/src/data/schedule.html`);
        });

        server.get('*', (req, res) => handle(req, res));

        server.listen(3000, err => {
            if (err) {
                throw err;
            }
            console.log('> Ready on http://localhost:3000');
        });
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });
