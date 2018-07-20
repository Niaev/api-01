function verificaErro (erro, res) {
    
    // verifica se há erro
    if (erro) {
        // então retorna uma mensagem de erro e um status de erro interno do servidor
        res.status(500).send('Desculpe! Estamos com problemas nessa página.');
        // exibe o erro no console do servidor
        console.log(erro);
        // e então dá um fim na execução da requisição
        return;
    }
    // senão...
}

// exporta o método
module.exports = function () {
    return verificaErro;
}