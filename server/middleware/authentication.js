var API_KEY = 'STEFAN'; // should be a secret (via environment variable)

module.exports = function(req, res, next) {
    if (req.get('x-api-key') !== API_KEY) {
        return res.status(403).send("x-api-key header required");
    }
    return next();
};