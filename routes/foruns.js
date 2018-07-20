module.exports = function (app) {

    // exibe todos os fóruns existentes
    app.get('/for-chaahc/foruns', function (req, res) {

        // cria objeto de acesso de dados
        var forunsBanco = app.metodos.conectaDAO('foruns', app);

        // método .lista() do objeto que lista os foruns
        forunsBanco.lista(function (erro, resultado) {
            
            // verificação de erro
            var verificaErro = app.metodos.verificaErro(erro, res);
            
            // os dados fornecidos pelo banco são exibidos
            res.status(200).send(resultado);
        });
    });

    // exibe o forum cujo nome foi digitado na url
    app.get('/for-chaahc/foruns/:nome', function (req, res) {

        // variável que guarda somente o nome digitado na url
        var nome = req.params.nome;

        // cria objeto de acesso de dados
        var forunsBanco = app.metodos.conectaDAO('foruns', app);

        // método .busca() do objeto que busca o forum pelo id
        forunsBanco.busca(nome, function (erro, resultado) {
            
            // verificação de erro
            var verificaErro = app.metodos.verificaErro(erro, res);

            // os dados fornecidos pelo banco são exibidos
            res.status(200).send(resultado);
        });
    });

    // exibe os posts do forum cujo nome foi digitado na url
    app.get('/for-chaahc/foruns/:nome/posts', function (req, res) {

        // variável que guarda somente o nome digitado na url
        var nome = req.params.nome;

        // cria objeto de acesso de dados
        var forunsBanco = app.metodos.conectaDAO('foruns', app);

        // método .posts() do objeto que busca os posts de um forum pelo id
        forunsBanco.posts(nome, function (erro, resultado) {
            
            // verificação de erro
            var verificaErro = app.metodos.verificaErro(erro, res);

            // os dados fornecidos pelo banco são exibidos
            res.status(200).send(resultado);
        });
    });

    // exibe o post, pelo índice, do forum cujo nome foi digitado na url
    app.get('/for-chaahc/foruns/:nome/post/:id', function (req, res) {

        // variável que guarda somente o índice digitado na url
        var id = req.params.id;
        // variável que guarda somente o nome digitado na url
        var nome = req.params.nome;

        // cria objeto de acesso de dados
        var forunsBanco = app.metodos.conectaDAO('foruns', app);

        // método .posts() do objeto que busca os posts de um forum pelo id
        forunsBanco.posts(nome, function (erro, resultado) {
            
            // verificação de erro
            var verificaErro = app.metodos.verificaErro(erro, res);

            // somente o primeiro dado fornecido pelo banco é exibido
            res.status(200).send(resultado[id]);
        });
    });
}