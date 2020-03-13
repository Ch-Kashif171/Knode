const CheckRoute = use("Core/helpers/CheckRoute");

exports.get = (action, method_action) => {

    try {

        let obj = call(action, method_action);

        app.get(obj.route_action, (req, res) => {

            CheckRoute.exist_route(true);

            if (isEmpty(req.params)) {
                obj.Controller[obj.method](req, res);
            } else {
                obj.Controller[obj.method](req, res, req.params);
            }
        });

    } catch (e) {
        console.log(e);
    }
};


exports.post = (action, method_action) => {

    try {

        let obj = call(action, method_action);

        app.post(obj.route_action, (req, res) => {

            CheckRoute.exist_route(true);

            obj.Controller[obj.method](req, res);
        });
    } catch (e) {
        console.log(e);
    }
};

function call(action, method_action) {

    let obj = {};
    let array = method_action.split("@");
    let controller_name = array[0];
    obj.method = array[1];

    const ControllerClass = use('App/controllers/' + controller_name);
    obj.Controller = new ControllerClass();

    obj.route_action = purifyAction(action);

    return obj;
}