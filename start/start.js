require('../config/app');
require('../core/helpers/helper');
const { config, engine } = require('express-edge');

const routeLoader = require('../core/routeLoader');

const express = require('express');
let bodyParser = require('body-parser');
let CheckRoute = require('../core/helpers/CheckRoute');

exports.ignite = () => {

    const app = express();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(express.static(base_path + '/public'));
    app.use(engine);
    app.set('views', base_path+'/views');


    routeLoader.app(app);

    CheckRoute.not_found();

    return app;
};
