module.exports = function (app) {
    
    // exibe todos os posts que existem em ordem de publicação
    app.get('/for-chaahc/posts', function (req, res) {

        // cria objeto de acesso de dados
        var postsBanco = app.metodos.conectaDAO('postagens', app);

        // método .lista() do objeto que lista as postagens
        postsBanco.lista(function (erro, resultado) {

            // verificação de erro
            var verificaErro = app.metodos.verificaErro(erro, res);
            
            // os dados fornecidos pelo banco são exibidos
            res.status(200).send(resultado);
        });
    });

    // exibe o post cujo id foi digitado na url
    app.get('/for-chaahc/posts/:id', function (req, res) {

        // variável que guarda somente o id digitado na url
        var id = req.params.id;

        // cria objeto de acesso de dados
        var postsBanco = app.metodos.conectaDAO('postagens', app);

        // método .busca() do objeto que busca a postagem pelo id
        postsBanco.busca(id, function (erro, resultado) {

            // verificação de erro
            var verificaErro = app.metodos.verificaErro(erro, res);
            
            // os dados fornecidos pelo banco são exibidos
            res.status(200).send(resultado);
        });
    });

    // exibe os comentarios do post cujo id foi digitado na url
    app.get('/for-chaahc/posts/:id/comentarios', function (req, res) {

        // variável que guarda somente o id digitado na url
        var id = req.params.id;

        // cria objeto de acesso de dados
        var postsBanco = app.metodos.conectaDAO('postagens', app);

        // método .comentarios() do objeto que lista os comentarios pelo id de uma postagem
        postsBanco.comentarios(id, function (erro, resultado) {
            
            // verificação de erro
            var verificaErro = app.metodos.verificaErro(erro, res);
            
            // os dados fornecidos pelo banco são exibidos
            res.status(200).send(resultado);
        });
    });

    // exibe o op (usuário) do post cujo id foi digitado na url
    app.get('/for-chaahc/posts/:id/op', function (req, res) {

        // variável que guarda somente o id digitado na url
        var id = req.params.id;

        // cria objeto de acesso de dados
        var postsBanco = app.metodos.conectaDAO('postagens', app);

        // método .op() do objeto que busca o op pelo id de uma postagem
        postsBanco.op(id, function (erro, resultado) {

            // verificação de erro
            var verificaErro = app.metodos.verificaErro(erro, res);
            
            // os dados fornecidos pelo banco são exibidos
            res.status(200).send(resultado);
        });
    });

    // exibe o forum do post cujo id foi digitado na url
    app.get('/for-chaahc/posts/:id/forum', function (req, res) {

        // variável que guarda somente o id digitado na url
        var id = req.params.id;

        // cria objeto de acesso de dados
        var postsBanco = app.metodos.conectaDAO('postagens', app);

        // método .forum() do objeto que busca o forum pelo id de uma postagem
        postsBanco.forum(id, function (erro, resultado) {

            // verificação de erro
            var verificaErro = app.metodos.verificaErro(erro, res);
            
            // os dados fornecidos pelo banco são exibidos
            res.status(200).send(resultado);
        });
    });

    // realiza uma postagem
    app.post('/for-chaahc/posts/cria', function (req, res) {

        // variável que guarda o objeto passado pelo método POST
        var post = req.body;
        // adiciona a propriedade 'data' com a data atual
        var dataPost = new Date();
        post.data = dataPost.toISOString().slice(0,10);

        // cria objeto de acesso de dados
        var postsBanco = app.metodos.conectaDAO('postagens', app);

        // método .cria() do objeto que realiza uma postagem
        postsBanco.cria(post, function (erro, resultado) {

            // verificação de erro
            var verificaErro = app.metodos.verificaErro(erro, res);

            // insere o valor do campo id no objeto
            post.id = resultado.insertId;
            // retorna ao usuario o sucesso da criação do post, exibindo suas informações
            res.status(201).json(post);
        });
    });

    /*
    
        APP.PUT() ALTERA POSTAGEM

        APP.DELETE() DELETA POSTAGEM DO BANCO DE DADOS

    */
}