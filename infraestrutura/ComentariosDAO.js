// criação do DAO de conexão com o banco para a manipulação de usuários
function ComentariosDAO (conexao) {

    // guarda a conexão com o banco fornecida nos parâmetros
    this._conexao = conexao;
}

// lista todos os comentários existentes (inútil)
ComentariosDAO.prototype.lista = function (callback) {
    this._conexao
        .query('SELECT * FROM comentarios;', callback);
}

// busca um comentario de acordo com o id
ComentariosDAO.prototype.busca = function (id, callback) {
    this._conexao
        .query(`SELECT * FROM comentarios WHERE comentarios.id = ${id};`, callback);
}

// busca o post de um comentario de acordo com o id
ComentariosDAO.prototype.post = function (id, callback) {
    this._conexao
        .query(`SELECT postagens.*
        FROM comentarios INNER JOIN postagens ON comentarios.post = postagens.id
        WHERE comentarios.id = ${id};`, callback);
}

// busca o autor de um comentario de acordo com o id
ComentariosDAO.prototype.autor = function (id, callback) {
    this._conexao
        .query(`SELECT usuarios.id, usuarios.nome
        FROM comentarios INNER JOIN usuarios ON comentarios.autor = usuarios.id
        WHERE comentarios.id = ${id};`, callback);
}

/*

    ComentariosDAO.prototype.altera = ALTERA COMENTÁRIO

    ComentariosDAO.prototype.deleta = DELETA COMENTÁRIO DO BANCO DE DADOS

*/

// exporta o DAO
module.exports = function () {
    return ComentariosDAO;
}

/*
    DAO = Data Access Object = Objeto de acesso de dados

    .prototype = Permite adicionar propriedades para o objeto

*/