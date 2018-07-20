var express = require('express');
var consign = require('consign');
var body = require('body-parser');

module.exports = function() {
    var app = express();

    app.use(body.urlencoded({ extended: true }));
	app.use(body.json());

    consign()
		.include('routes')
        .then('infraestrutura')
        .then('metodos')
        .into(app);

    return app;
}
