var _ = require('lodash');
var userService = require('../services/user.js')
var log = require('simple-node-logger').createSimpleLogger();
var msg = '';
var defaultLat = 51.507320;
var defaultLong = -0.106701;

// A registration endpoint to register users
exports.register = function(req, res) {
    // This is a database operation
    userService.create(req.body)
        .then(function(user) {
            msg = 'User registered Successfully';
            log.info(msg);
            return res.json({
                success: true,
                msg: msg,
                data: user
            });
        })
        .catch(function(err) {
            log.error(err);
            return res.json({
                success: false,
                msg: err
            });
        });
};

// A location endpoint that updates a user's location using Latitude and Longitude
// Co-ordinates can be passed in or fallback to the defaults set
exports.location = function(req, res) {
    var lat = req.body.latitude || defaultLat;
    var long = req.body.longitude || defaultLong;
    userService.update(req.body.username, lat, long)
        .then(function(user) {
            msg = 'User location updated Successfully';
            log.info(msg);
            return res.json({
                success: true,
                msg: msg,
                data: user
            });
        })
        .catch(function(err) {
            log.error(err);
            return res.json({
                success: false,
                msg: err
            });
        });
};

// An endpoint to find a user by username
exports.get = function(req, res) {
    var username = req.query.username;
    if (!username) {
        msg = 'Username missing';
        log.info(msg);
        return res.json({
            status: 400,
            success: false,
            message: msg
        });
    } else {
        userService.findOne(username)
            .then(function(user) {
                var location = user.latitude && user.longitude ?
                    'https://www.google.co.uk/maps/?q=' + user.latitude + ',' + user.longitude : 'User\'s location not set';
                return res.json({
                    success: true,
                    data: {
                        username: user.username,
                        email: user.email,
                        phoneNumber: user.phoneNumber,
                        location: location
                    }
                });
            })
            .catch(function(err) {
                log.error(err);
                return res.json({
                    success: false,
                    msg: err
                });
            });
    }
}