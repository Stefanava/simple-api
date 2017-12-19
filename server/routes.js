var userController = require('./controllers/user');

module.exports = function(app) {
    app.post('/register', userController.register);
    app.put('/location', userController.location);
    app.get('/users', userController.get);
};
