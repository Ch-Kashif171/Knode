const env = use('Core/helpers/env');

    exports.con = (res) => {
        let db = {};
        /*connect db once and reuse it for querying data*/
        const MongoClient = require('mongodb').MongoClient;
        let ObjectId = require('mongodb').ObjectId;

        const url = "mongodb://"+env.get("DB_HOST")+":"+env.get("DB_PORT")+"/";
        const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true});
        const connection = client.connect();
        /*mongodb connection*/

        db.client = client;
        db.connection = connection;
        db.ObjectId = ObjectId;

        return db;
    };