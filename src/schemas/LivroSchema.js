const mongoose = require('mongoose')

const LivroSchema = mongoose.Schema({
    nomeLivro: {
        type: String,
    },
    autorLivro: {
        type: String,
    },
    generoTextualLivro: {
        type: String,
    },
    linkAcessoLivro: {
        type: String,
    },
    faixaEtariaLivro: {
        type: String,
    },
    statusLivro: {
        type: String,
    },
    generoLivro: {
        type: String,
    },
    sinopseLivro: {
        type: String,
    }
});

module.exports = mongoose.model('Livros', LivroSchema);

