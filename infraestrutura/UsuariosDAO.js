// criação do DAO de conexão com o banco para a manipulação de usuários
function UsuariosDAO (conexao){

    // guarda a conexão com o banco fornecida nos parâmetros
    this._conexao = conexao;
}

// lista os usuários
UsuariosDAO.prototype.lista = function (callback) {
    this._conexao
        .query('SELECT usuarios.id, usuarios.nome FROM usuarios;', callback);
}

// exibe o usuário de acordo com o nome
UsuariosDAO.prototype.busca = function (nome, callback) {
    this._conexao
        .query(`SELECT usuarios.id, usuarios.nome FROM usuarios WHERE nome = '${nome}';`, callback);
}

// lista as postagens do usuario de acordo com o nome
UsuariosDAO.prototype.posts = function (nome, callback) {
    this._conexao
        .query(`SELECT postagens.*
        FROM usuarios INNER JOIN postagens ON usuarios.id = postagens.op
        WHERE usuarios.nome = '${nome}';`, callback);
}

// lista os comentarios do usuário de acordo com o nome
UsuariosDAO.prototype.comentarios = function (nome, callback) {
    this._conexao
        .query(`SELECT comentarios.*
        FROM usuarios INNER JOIN comentarios ON usuarios.id = comentarios.autor
        WHERE usuarios.nome = '${nome}';`, callback);
}

// cria um novo usuário
UsuariosDAO.prototype.cria = function (usuario, callback) {
    this._conexao
        .query(`INSERT INTO usuarios (nome, senha)
        VALUES ('${usuario.nome}', '${usuario.senha}');`, callback);
}

// lista os usuários com senha
UsuariosDAO.prototype.login = function (callback) {
    this._conexao
        .query('SELECT usuarios.nome, usuarios.senha FROM usuarios;', callback);
}

// altera informações de um usuário
UsuariosDAO.prototype.altera = function (alteracao, callback) {
    this._conexao
        .query(`UPDATE usuarios SET ${alteracao.campo} = '${alteracao.valor}'
        WHERE id = ${alteracao.id};`, callback);
}

// deleta as informações do usuário
UsuariosDAO.prototype.deleta = function (usuario, callback) {
    this._conexao
        .query(`DELETE FROM usuarios WHERE id = ${usuario.id}`, callback)
}

// exporta o DAO
module.exports = function () {
    return UsuariosDAO;
}

/*
    DAO = Data Access Object = Objeto de acesso de dados

    .prototype = Permite adicionar propriedades para o objeto

*/