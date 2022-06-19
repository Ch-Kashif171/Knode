const database = require('../../config/database');

class DatabaseType {

    constructor() {
        this.db_type = database.connection;
    }

    database() {

        if (this.db_type == "mongodb") {

        } else if(this.db_type == "mysql") {

        }
    }
}

module.exports = DatabaseType;