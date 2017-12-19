var _ = require('lodash');
var Regex = require('regex');
// If lookarounds were supported by JavaScript then this would have been my solution
// var acceptableUsernameTest = new Regex("/(?<!s)cat(?!fish)|(?<!bull)dog|(?<!sea)horse/gi");
var users = [];

// Model functions
module.exports = {
    // Simulate a database create function
    create: function(user) {
        return new Promise(function(resolve, reject) {
            // Username is required
            if (!user.username || user.username.length < 3 || user.username.length > 9) {
                return reject({
                    status: 400,
                    message: 'A username with length 3-9 characters is requried to register a user'
                });
            }
            // Username must be valid
            if (!usernameIsValid(user.username)) {
                return reject({
                    status: 400,
                    message: 'The username is invalid'
                });
            }
            // Username must be unique
            if (usernameExists(user.username)) {
                return reject({
                    status: 400,
                    message: 'A user already exists with that username'
                });
            }
            // Email must be unique
            if (!user.email && !emailExists(user.email)) {
                return reject({
                    status: 400,
                    message: 'A user already exists with that e-mail address'
                });
            }
            // Phone number must be unique
            if (!user.phoneNumber && phoneNumberExists(user.phoneNumber)) {
                return reject({
                    status: 400,
                    message: 'A user already exists with that phone number'
                });
            }
            users.push(user); // "Saved into the database"
            return resolve(user);
        });
    },
    // Simulate a database update function
    update: function(username, latitude, longitude) {
        return new Promise(function(resolve, reject) {
            var index = _.findIndex(users, { username: username });
            if (index > -1) {
                users[index].latitude = latitude;
                users[index].longitude = longitude;
                return resolve(users[index]);
            }
            return reject({
                status: 404,
                message: 'Cannot find user with username: ' + username
            });
        });
    },
    // Simulate a database findOne operation
    findOne: function(username) {
        return new Promise(function(resolve, reject) {
            var index = _.findIndex(users, { username: username });
            if (index > -1) {
                return resolve(users[index])
            }
            return reject({
                status: 404,
                message: 'Cannot find user with username: ' + username
            });
        });
    }
};

function usernameIsValid(username) {
    // If lookarounds were supported by JavaScript then this would have been my solution
    // return !acceptableUsernameTest.test((username || ''));
    var valid = false;
    var arr = (username).match(/cat|dog|horse/gi);
    if (arr.length) {
        valid = false;
        switch (arr[0]) {
            case 'cat':
                valid = username.includes('catfish') || username.includes('scatter');
                break;
            case 'horse':
                valid = username.includes('seahorse');
                break;
            case 'dog':
                valid = username.includes('bulldog');
                break;
        }
    }
    return valid;
};

function usernameExists(username) {
    return _.find(users, {
        username: username
    });
};

function emailExists(username) {
    return _.find(users, {
        email: email
    });
};

function phoneNumberExists(phoneNumber) {
    return _.find(users, {
        phoneNumber: phoneNumber
    });
};