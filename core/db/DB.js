'use strict'

const Doctrine = use('Core/db/Doctrine');
const Table = use('Core/States/Table');

class DB extends Doctrine {

    constructor() {
        super();
    }

    static table(table) {
        Table.table(table);
        this.query = new Doctrine();
        return this;
    }


}

module.exports = DB;