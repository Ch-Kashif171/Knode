global.use = function(namespace) {

    if (namespace.includes("App") || namespace.includes("Core")) {
        return require(base_path+'/'+namespace);
    } else {
        return require(namespace);
    }
};

global.abort = function(code) {
    app.use(function(req, res, next){
        res.render('errors/'+code);
    });
};


global.purifyAction = function (action) {

   let  route_action = action.replace(/^\/|\/$/g, '');

    return "/"+route_action;
};

global.isEmpty = function (obj) {

    return !Object.keys(obj).length;
};

const edge = use('edge.js');

edge.global('public_path', function () {
    return base_path;
});

edge.global('count', function (array) {
    return array instanceof Array ? array.length : 0
});