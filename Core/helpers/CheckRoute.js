var is_route = false;
class CheckRoute {

    static exist_route(route = false) {
        is_route = route;
    }


    static not_found() {
        if (! is_route) {
            abort("404");
           console.log("Page not found!");
        }
    }

}

module.exports = CheckRoute;