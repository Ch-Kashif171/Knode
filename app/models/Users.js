'use strict';

const Model = use('Core/db/Model');


class Users extends Model {

    constructor() {
        super();

        /**
         * @set table name here, else do not define it.
         * @type {string}
         */
       this.table = "users";
    }

}

module.exports = Users;
