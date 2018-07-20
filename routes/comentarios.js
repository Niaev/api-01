module.exports = function (app) {

    // exibe todos os comentarios existentes
    app.get('/for-chaahc/comentarios', function (req, res) {

        // cria objeto de acesso de dados
        var comentariosBanco = app.metodos.conectaDAO('comentarios', app);

        // método .lista() do objeto que lista os comentarios
        comentariosBanco.lista(function (erro, resultado) {
            
            // verificação de erro
            var verificaErro = app.metodos.verificaErro(erro, res);
            
            // os dados fornecidos pelo banco são exibidos
            res.status(200).send(resultado);
        });
    });

    // exibe o comentario cujo id foi digitado na url
    app.get('/for-chaahc/comentarios/:id', function (req, res) {

        // variável que guarda somente o id digitado na url
        var id = req.params.id;

        // cria objeto de acesso de dados
        var comentariosBanco = app.metodos.conectaDAO('comentarios', app);

        // método .busca() do objeto que busca o comentario pelo id
        comentariosBanco.busca(id, function (erro, resultado) { 

            // verificação de erro
            var verificaErro = app.metodos.verificaErro(erro, res);

            // os dados fornecidos pelo banco são exibidos
            res.status(200).send(resultado);
        });
    });

    // exibe o post do comentario cujo id foi digitado na url
    app.get('/for-chaahc/comentarios/:id/post', function (req, res) {

        // variável que guarda somente o id digitado na url
        var id = req.params.id;

        // cria objeto de acesso de dados
        var comentariosBanco = app.metodos.conectaDAO('comentarios', app);

        // método .post() do objeto que busca o post do comentario pelo id
        comentariosBanco.post(id, function (erro, resultado) {
            
            // verificação de erro 
            var verificaErro = app.metodos.verificaErro(erro, res);

            // os dados fornecidos pelo banco são exibidos
            res.status(200).send(resultado);
        });
    });

    // exibe o autor do comentario cujo id foi digitado na url
    app.get('/for-chaahc/comentarios/:id/autor', function (req, res) {

        // variável que guarda somente o id digitado na url
        var id = req.params.id;

        // cria objeto de acesso de dados
        var comentariosBanco = app.metodos.conectaDAO('comentarios', app);

        // método .autor() do objeto que busca o autor do comentario pelo id
        comentariosBanco.autor(id, function (erro, resultado) {
            
            // verificação de erro
            var verificaErro = app.metodos.verificaErro(erro, res);
            
            // os dados fornecidos pelo banco são exibidos
            res.status(200).send(resultado);
        });
    });

/*

    APP.PUT() ALTERA COMENTÁRIO

    APP.DELETE() DELETA COMENTÁRIO DO BANCO DE DADOS

*/
}