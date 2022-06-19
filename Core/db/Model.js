'use strict';
const Doctrine = use('Core/db/Doctrine');
const Table = use('Core/States/Table');

class Model extends Doctrine {


    constructor() {
        super();

    }

    static eloquent() {
        let model = new this();
        let table = typeof model.table !== "undefined" ? model.table : this.name;

        Table.table(table);
        this.query = new Doctrine();
        return this;
    }
}

module.exports = Model;