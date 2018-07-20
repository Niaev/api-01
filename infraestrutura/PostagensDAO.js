// criação do DAO de conexão com o banco para a manipulação de postagens
function PostagensDAO (conexao) {

    // guarda a conexão com o banco fornecida nos parâmetros
    this._conexao = conexao;
}

// lista as postagens
PostagensDAO.prototype.lista = function (callback) {
    this._conexao
        .query('SELECT * FROM postagens;', callback);
}

// exibe a postagem de acordo com o id
PostagensDAO.prototype.busca = function (id, callback) {
    this._conexao
        .query(`SELECT * FROM postagens WHERE id = ${id};`, callback);
}

// lista os comentarios de uma postagem de acordo com o id
PostagensDAO.prototype.comentarios = function (id, callback) {
    this._conexao
        .query(`SELECT comentarios.*
        FROM postagens INNER JOIN comentarios ON postagens.id = comentarios.post
        WHERE postagens.id = ${id};
        `, callback);
}

// exibe o op (usuário) de uma postagem de acordo com o id
PostagensDAO.prototype.op = function (id, callback) {
    this._conexao
        .query(`SELECT usuarios.id, usuarios.nome
        FROM postagens INNER JOIN usuarios ON postagens.op = usuarios.id
        WHERE postagens.id = ${id};
        `, callback);
}

// exibe o forum de uma postagem de acordo com o id
PostagensDAO.prototype.forum = function (id, callback) {
    this._conexao
        .query(`SELECT foruns.*
        FROM postagens INNER JOIN foruns ON postagens.forum = foruns.id
        WHERE postagens.id = ${id};
        `, callback);
}

// cria um novo post
PostagensDAO.prototype.cria = function (post, callback) {
    this._conexao
        .query(`INSERT INTO postagens (op, forum, txt, img, data)
        VALUES (${post.op}, ${post.forum}, '${post.txt}', '${post.img}', '${post.data}');`, callback);
}

/*

    PostagensDAO.prototype.altera = ALTERA POSTAGEM

    PostagensDAO.prototype.deleta = DELETA POSTAGEM DO BANCO DE DADOS

*/

// exporta o DAO
module.exports = function () {
    return PostagensDAO;
}

/* ADICIONAIS:

    DAO = Data Access Object = Objeto de acesso de dados

    .prototype = Permite adicionar propriedades para o objeto

*/