function conectaDAO (tabela, app) {
    
    // conexão com o banco de dados
    var conexao = app.infraestrutura.abreConexao();

    // define o objeto de acordo com o parâmetro passado pela função
    if (tabela == 'usuarios') {
        return new app.infraestrutura.UsuariosDAO(conexao);
    } else if (tabela == 'postagens') {
        return new app.infraestrutura.PostagensDAO(conexao);
    } else if (tabela == 'foruns') {
        return new app.infraestrutura.ForunsDAO(conexao);
    } else if (tabela == 'comentarios') {
        return new app.infraestrutura.ComentariosDAO(conexao);
    }
}

// exporta o método
module.exports = function () {
    return conectaDAO;
}