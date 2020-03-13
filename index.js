let start = require('./start/start');


/*ignite all things */
let app = start.ignite();

app.listen(3002, () =>
    console.log('Express server is running on localhost:3002')
);