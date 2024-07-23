const express = require('express');
const logger = require('morgan');
const path = require('path');
const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Setup static page serving for all the pages in "public"
const publicServedFilesPath = path.join(__dirname, 'public');
server.use(express.static(publicServedFilesPath));

server.post('/ITC505/lab-7/submit', (req, res) => {
    const { adjective, noun, verb, place, animal } = req.body;
    if (!adjective || !noun || !verb || !place || !animal) {
        res.status(400).json({
            error: 'Please fill out ALL fields'
        });
        return;
    }
    const madLib = `Once upon a time, a very ${adjective} ${noun} decided to ${verb} in the ${place}. To its surprise, it found a ${animal} there.`;

    res.json({
        story: madLib
    });
});


// The server uses port 80 by default unless you start it with the extra
// command line argument 'local' like this:
//       node server.js local
let port = 80;
if (process.argv[2] === 'local') {
    port = 8080;
}

server.listen(port, () => console.log(`Ready on localhost:${port}`));
