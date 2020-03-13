
exports.app = (app) => {

    global.app = app;

    /**
     * @include user define route file here
     */
    require('../routes/route');
};