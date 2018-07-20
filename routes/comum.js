module.exports = function (app) {

    // resgata o nada passado pelo url e redireciona para outra página
    app.get('/', function (req, res) {

        // redireciona para localhost:3000/for-chaahc/
        res.redirect('for-chaahc/');
    });

    // exibe uma mensagem simples como página inicial
    app.get('/for-chaahc', function (req, res) {
 
        res.status(200).send('(aparentemente) O servidor está funcionando sem problemas');
    });
}