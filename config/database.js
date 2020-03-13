'use strict';

const env = use('Core/helpers/env');

module.exports = {

    connection: env.get('DB_CONNECTION', 'mongodb'),

    mysql: {
        client: 'mysql',
        connection: {
            host: env.get('DB_HOST', 'localhost'),
            port: env.get('DB_PORT', ''),
            user: env.get('DB_USER', 'root'),
            password: env.get('DB_PASSWORD', ''),
            database: env.get('DB_DATABASE', 'knode')
        }
    },

    mongodb: {
        client: 'mongodb',
        connection: {
            host: env.get('DB_HOST', 'localhost'),
            port: env.get('DB_PORT', ''),
            user: env.get('DB_USER', ''),
            password: env.get('DB_PASSWORD', ''),
            database: env.get('DB_DATABASE', 'knode')
        }
    },

};
