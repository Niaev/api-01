// criação do DAO de conexão com o banco para a manipulação de postagens
function ForunsDAO (conexao) {

    // guarda a conexão com o banco fornecida nos parâmetros
    this._conexao = conexao;
}

// lista os foruns
ForunsDAO.prototype.lista = function (callback) {
    this._conexao
        .query('SELECT * FROM foruns;', callback);
}

// exibe o forum de acordo com o nome
ForunsDAO.prototype.busca = function (nome, callback) {
    this._conexao
        .query(`SELECT * FROM foruns WHERE foruns.nome = '${nome}';`, callback);
}

// lista os posts de um forum de acordo com o nome
ForunsDAO.prototype.posts = function (nome, callback) {
    this._conexao
        .query(`SELECT
            postagens.id id_postagem,
            postagens.op op,
            postagens.txt postagem,
            postagens.img img_postagem,
            postagens.data data
        FROM foruns INNER JOIN postagens ON foruns.id = postagens.forum
        WHERE foruns.nome = '${nome}';      
        `, callback);
}

// exporta o DAO
module.exports = function () {
    return ForunsDAO;
}

/* ADICIONAIS:

    DAO = Data Access Object = Objeto de acesso de dados

    .prototype = Permite adicionar propriedades para o objeto

*/