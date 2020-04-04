let express = require('express');
let app = express();
const request = require('request');

app.get('/', (req, res) => {
    request('https://jsonplaceholder.typicode.com/users', { json: true }, (err, responseUsers, body) => {
        if (err || responseUsers.statusCode !== 200) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al consultar users externos'
            });
        }
        res.status(200).json({
            ok: true,
            users: responseUsers.body
        });
    })
});

module.exports = app;
