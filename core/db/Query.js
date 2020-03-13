'use strict'
const deasync = use('deasync');

const Statement = use('Core/States/Statement');
const Table = use('Core/States/Table');
const db_connection = use('Core/db/connection');
const env = use('Core/helpers/env');
let db = db_connection.con();

class Query {

    constructor() {
       this.table_name = Table.get_table();
       this.state = Statement.get_state();
    }

    allData() {

        let condition = this.condition_statement();
        let select_fields = this.select_fields();
        let order_state = this.order_state();

        let data = [];
        db.connection.then(() => {
           db.client.db(env.get('DB_DATABASE')).collection(this.table_name).find(condition, { projection: select_fields }).sort(order_state).toArray(function (err, results) {
                if (err) throw err;
                data = results;
            });
        });

        deasync.sleep(500);

        return data;
    }

    getData() {

        let condition = this.condition_statement();
        let select_fields = this.select_fields();
        let order_state = this.order_state();

        let data = [];
        db.connection.then(() => {
            db.client.db(env.get('DB_DATABASE')).collection(this.table_name).find(condition, { projection: select_fields } ).sort(order_state).toArray(function (err, results) {
                if (err) throw err;
                data = results;
            });

        });

        deasync.sleep(500);

        return data;
    }

    insertData(data) {

        let save = false;

        db.connection.then(() => {
            db.client.db(env.get('DB_DATABASE')).collection(this.table_name).insertOne(data, function(err, res) {
                if (err) throw err;

                save = true;
            });

        });

        deasync.sleep(100);

        return save;
    }

    firstRow() {

        let data = [];

        let condition = this.condition_statement();
        let select_fields = this.select_fields();
        let order_state = this.order_state();

        db.connection.then(() => {
            db.client.db(env.get('DB_DATABASE')).collection(this.table_name).find(condition, { projection: select_fields } ).sort(order_state).limit(1).toArray(function (err, results) {
                if (err) throw err;
                data = results[0];
            });

        });

        deasync.sleep(500);

        return data;
    }

    findRow(id) {

        let data = [];

        let condition = {_id: db.ObjectId(id)};
        let select_fields = this.select_fields();

        db.connection.then(() => {
            db.client.db(env.get('DB_DATABASE')).collection(this.table_name).findOne(condition, { projection: select_fields })
                .then(function(record) {
                    data = record;
                    if(!record) {
                        throw new Error('No record found.');
                    }

                });
        });

        deasync.sleep(500);

        return data;
    }

    countRecord() {

        let count = 0;
        let condition = this.condition_statement();

        db.connection.then(() => {
            db.client.db(env.get('DB_DATABASE')).collection(this.table_name).find(condition).count(function (err, res) {
                if (err) throw err;

                count = res;
            });
        });

        deasync.sleep(100);

        return count;
    }

    sumRecord() {

        let count = 0;
        let condition = this.condition_statement();

        db.connection.then(() => {
            db.client.db(env.get('DB_DATABASE')).collection(this.table_name).find(condition).count(function (err, res) {
                if (err) throw err;

                count = res;
            });
        });

        deasync.sleep(100);

        return count;
    }

    deleteRecord() {

        let save = false;


        let condition = this.condition_statement();
        let select_fields = this.select_fields();

        db.connection.then(() => {
            db.client.db(env.get('DB_DATABASE')).collection(this.table_name).deleteOne(condition, { projection: select_fields })
                .then(function(record) {
                    if(!record) {
                        throw new Error('No record found.');
                    }

                    save = true;

                });

        });

        deasync.sleep(500);

        return save;
    }

    selectiveFields(fields) {
        Statement.select_state(fields)
    }

    whereStatement(field, condition, value) {

        Statement.where_state(field, condition, value, true)
    }

    condition_statement() {

        let object = {};
        let field_name = this.state.field;

        var value = this.state.value;

        if (this.state.field == "_id") {
            value = db.ObjectId(this.state.value);
        }

        switch(this.state.condition) {
            case "=":
                object[field_name] = value;
                break;
            case  "!=":
                object[field_name] = {$ne: value};
                break;
            case  ">":
                object[field_name] = {$gt: value};
                break;
            case  "<":
                object[field_name] = {$lt: value};
                break;
            case  ">=":
                object[field_name] = {$gte: value};
                break;
            case  "<=":
                object[field_name] = {$lte: value};
                break;
            default:
                object[field_name] = value;
        }

        return object;
    }

    select_fields() {

        let object = {};

        if (typeof this.state.fields !== "undefined") {
            for (let i = 0; i < this.state.fields.length; i++) {
                let name = this.state.fields[i];
                object[name] = 1;
            }
            return object;
        } else {
            return object;
        }
    }

    order_state() {

        let object = {};
        let order_by = this.state.order_by;
        let type = this.state.type;

        if (typeof type !== "undefined" && type.toLowerCase() == "asc") {
           object[order_by] = 1;
            return object;
        } else if (typeof type !== "undefined" && type.toLowerCase() == "desc") {
            object[order_by] = -1;
            return object;
        } else {
            return object;
        }
    }

    orderByStatement(order_by, type) {
        Statement.order_by_state(order_by, type);
    }

}

module.exports = Query;