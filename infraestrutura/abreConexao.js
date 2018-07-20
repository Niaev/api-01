var mysql = require('mysql');

function criaConexao() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'api2'
    });
}

module.exports = function(){
    return criaConexao;
}