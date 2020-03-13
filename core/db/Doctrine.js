'use strict'

const Query = use('Core/db/Query');

class Doctrine extends Query {

    constructor() {
        super();

        this.query = new Query();
    }

    static  all() {
        return this.query.allData();
    }

    static get() {
        return this.query.getData();
    }

    static insert(data) {
        return this.query.insertData(data);
    }

    static first() {
        return this.query.firstRow();
    }


    static delete() {
        return this.query.deleteRecord();
    }

    static find(id) {
        return this.query.findRow(id);
    }

    static count() {
        return this.query.countRecord();
    }

    static sum() {
        return this.query.sumRecord();
    }

    static select() {
        let fields = arguments;
        this.query.selectiveFields(fields);
        return this;
    }

    static where(field, condition, value) {
        this.query.whereStatement(field, condition, value);
        return this;
    }

    static orderBy(order_by, type) {
        this.query.orderByStatement(order_by, type);
        return this;
    }

}

module.exports = Doctrine;