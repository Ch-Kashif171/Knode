use('dotenv').config();

exports.get = (key) => {
    return process.env[key];
};