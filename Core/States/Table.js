class Table {

    static table(table) {
        this.table_name = table.toLowerCase();
    }


   static get_table() {
        return this.table_name;
    }
}

module.exports = Table;