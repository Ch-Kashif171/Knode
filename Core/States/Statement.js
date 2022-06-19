class Statement {

    static where_state(field, condition, value, is_where) {
        this.field = field;
        this.condition = condition;
        this.value = value;
        this.is_where = is_where;
    }

    static select_state(fields) {
        this.fields = fields;
    }

    static order_by_state(order_by, type) {
        this.order_by = order_by;
        this.type = type;
    }

   static get_state() {
        return this;
    }
}

module.exports = Statement;