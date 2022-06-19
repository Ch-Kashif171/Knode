"use strict";


class HomeController {

    constructor() {
        //
    }

    index(request, response) {

        response.render('index');
    }
}


module.exports = HomeController;