module.exports = function (app) {

    // exibe todos os usuarios existentes
    app.get('/for-chaahc/usuarios', function (req, res) {

        // cria objeto de acesso de dados
        var usuariosBanco = app.metodos.conectaDAO('usuarios', app);

        // método .lista() do objeto que lista os usuários
        usuariosBanco.lista(function (erro, resultado) {
            
            // verificação de erro
            var verificaErro = app.metodos.verificaErro(erro, res);
            
            // os dados fornecidos pelo banco são exibidos
            res.status(200).send(resultado);
        });

    });
    
    // exibe o usuário cujo nome foi digitado na url
    app.get('/for-chaahc/usuarios/:nome', function (req, res) {

        // variável que guarda somente o nome digitado na url
        var nome = req.params.nome;

        // cria objeto de acesso de dados
        var usuariosBanco = app.metodos.conectaDAO('usuarios', app);

        // método .busca() do objeto que busca o usuário pelo nome
        usuariosBanco.busca(nome, function (erro, resultado) {
            
            // verificação de erro
            var verificaErro = app.metodos.verificaErro(erro, res);
            
            // os dados fornecidos pelo banco são exibidos
            res.format({
                html: function() {
                    res.status(200).send(resultado);
                },
                json: function() {
                    res.status(200).json(resultado);
                }
            });
        });

    });

    // exibe todos os posts em que o usuário especificado é op
    app.get('/for-chaahc/usuarios/:nome/posts', function (req, res) {

        // variável que guarda somente o nome digitado na url
        var nome = req.params.nome;

        // cria objeto de acesso de dados
        var usuariosBanco = app.metodos.conectaDAO('usuarios', app);

        // método .posts() do objeto que busca os posts de um usuario pelo seu nome
        usuariosBanco.posts(nome, function (erro, resultado) {

            // verificação de erro
            var verificaErro = app.metodos.verificaErro(erro, res);

            // os dados fornecidos pelo banco são exibidos
            res.status(200).send(resultado);
        });

    });

    // exibe o post específico, pelo índice, de um usuário específico, pelo nome
    app.get('/for-chaahc/usuarios/:nome/post/:id', function (req, res) {

        // variável que guarda somente o nome digitado na url
        var nome = req.params.nome;
        // variavel que guarda somente o índice digitado na url
        var id = req.params.id;

        // cria objeto de acesso de dados
        var usuariosBanco = app.metodos.conectaDAO('usuarios', app);

        // método .posts() do objeto que busca os posts de um usuario pelo seu nome
        usuariosBanco.posts(nome, function (erro, resultado) {

            // verificação de erro
            var verificaErro = app.metodos.verificaErro(erro, res);

            // os dados fornecidos pelo banco são exibidos
            res.status(200).send(resultado[id]);
        });

    });

    // exibe todos os comentarios realizados pelo usuário cujo nome foi digitado na url
    app.get('/for-chaahc/usuarios/:nome/comentarios', function (req, res) {
        
        // variável que guarda somente o nome digitado na url
        var nome = req.params.nome;

        // cria objeto de acesso de dados
        var usuariosBanco = app.metodos.conectaDAO('usuarios', app);

        // método .comentarios() do objeto que busca os comentarios de um usuário pelo seu nome
        usuariosBanco.comentarios(nome, function (erro, resultado) {

            // verificação de erro
            var verificaErro = app.metodos.verificaErro(erro, res);
            
            // os dados fornecidos pelo banco são exibidos
            res.status(200).send(resultado);
        });
    });

    // exibe todos o comentario específico, pelo índice, do usuário cujo nome foi digitado na url
    app.get('/for-chaahc/usuarios/:nome/comentario/:id', function (req, res) {
        
        // variável que guarda somente o nome digitado na url
        var nome = req.params.nome;
        // variavel que guarda somente o índice digitado na url
        var id = req.params.id;

        // cria objeto de acesso de dados
        var usuariosBanco = app.metodos.conectaDAO('usuarios', app);

        // método .comentarios() do objeto que busca os comentarios de um usuário pelo seu nome
        usuariosBanco.comentarios(nome, function (erro, resultado) {

            // verificação de erro
            var verificaErro = app.metodos.verificaErro(erro, res);
            
            // os dados fornecidos pelo banco são exibidos
            res.status(200).send(resultado[id]);
        });
    });

    // cria usuario
    app.post('/for-chaahc/usuarios/cria', function (req, res) {

        // variável que guarda o objeto passado pelo POST
        var usuario = req.body;

        // cria objeto de acesso de dados
        var usuariosBanco = app.metodos.conectaDAO('usuarios', app);

        // método .login() do objeto que retorna os dados do usuário
        usuariosBanco.login(function (erro, resultado) {

            // verificação de erro
            var verificaErro = app.metodos.verificaErro(erro, res);

            // variável booleana
            var boo = false;

            // para cada linha de resultado na tabela
            resultado.forEach(usu => {

                // os dados fornecidos pelos usuário são comparados com os fornecidos pelo banco
                if (usuario.nome === usu.nome || usuario.senha === usu.senha) {
                    boo = true;
                }
            });

            // se os valores do cadastro coincidem com dados já existentes no banco, 
            // a criação do usuário é interrompida 
            if (boo) {
                res.status(401).send('O cadastro foi negado, pois os valores para o processo já existem\n');
                return;
            }

            // método .cria() do objeto que insere um novo usuario
            usuariosBanco.cria(usuario, function (erro, resultado) {

                // verificação de erro
                var verificaErro = app.metodos.verificaErro(erro, res);

                // insere o valor do campo id no objeto
                usuario.id = resultado.insertId;
                // retorna ao usuario o sucesso da criação do usuário, exibindo suas informações
                res.status(201).json(usuario);
            });
        });
    });

    // efetua o 'login' de um usuário
    app.post('/for-chaahc/usuarios/login', function (req, res) {

        // variável que guarda o objeto passado pelo POST
        var usuario = req.body;

        // cria objeto de acesso de dados
        var usuariosBanco = app.metodos.conectaDAO('usuarios', app);
        
        // método .login() do objeto que retorna os dados do usuário 
        usuariosBanco.login(function (erro, resultado) {

            // verificação de erro
            var verificaErro = app.metodos.verificaErro(erro, res);

            // variável booleana
            var boo = false;

            // para cada linha de resultado na tabela
            resultado.forEach(usu => {

                // os dados fornecidos pelos usuário são comparados com os fornecidos pelo banco
                if (usuario.nome === usu.nome && usuario.senha === usu.senha) {
                    boo = true;
                }
            });

            // se a operação condicional anterior não deu certo, o login é inválido
            if (!boo) {
                res.status(401).send('O login foi negado, pois os valores para o processo estão errados\n');
                return;
            }

            // em caso positivo, o login é bme sucedido
            console.log(`Nome: ${usuario.nome}\nSenha: ${usuario.senha}\nOs valores correspondem`);
            res.status(202).send('Login realizado com sucesso!');
        });
    });

    // efetua alterações no usuário logado
    app.put('/for-chaahc/usuarios/altera', function (req, res) {

        /* 
        
            de alguma maneira, provavelmente no serviço que consome a API,
            será necessário verificar se o usuário está logado antes de efetuar a alteração.
        
        */

        // variável que guarda o objeto passado pelo POST
        var alteracao = req.body;

        // cria objeto de acesso de dados
        var usuariosBanco = app.metodos.conectaDAO('usuarios', app);

        // método .altera() do objeto que altera dados específicos do usuário
        usuariosBanco.altera(alteracao, function (erro, resultado) {

            // verificação de erro
            var verificaErro = app.metodos.verificaErro(erro, res);

            // sucesso
            res.status(201).send('Alteração realizada com sucesso!');
        });
    });

    // efetua alterações no usuário logado
    app.delete('/for-chaahc/usuarios/deleta', function (req, res) {

        /* 
        
            de alguma maneira, provavelmente no serviço que consome a API,
            será necessário verificar se o usuário está logado antes de efetuar a exclusão.
        
        */
        
        // variável que guarda o objeto passado pelo POST
        var usuario = req.body;

        // cria objeto de acesso de dados
        var usuariosBanco = app.metodos.conectaDAO('usuarios', app);

        // método .deleta() do objeto que deleta os dados do usuário
        usuariosBanco.deleta(usuario, function (erro, resultado) {

            // verificação de erro
            var verificaErro = app.metodos.verificaErro(erro, res);

            // sucesso
            res.status(201).send('Seu usuário foi excluído.');
        });
    });
}