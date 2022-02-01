const mongoose = require('mongoose')

const LivroSchema = mongoose.Schema({
    /* não necessario codigo aqui */
    
    // nomeLivro: {
    //     type: mongoose.SchemaTypes.String,
    // },
    // autorLivro: {
    //     type: mongoose.SchemaTypes.String,
    // },
    // generoTextualLivro: {
    //     type: mongoose.SchemaTypes.String,
    // },
    // linkAcessoLivro: {
    //     type: mongoose.SchemaTypes.String,
    // },
    // faixaEtariaLivro: {
    //     type: mongoose.SchemaTypes.String,
    // },
    // statusLivro: {
    //     type: mongoose.SchemaTypes.String,
    // },
    // generoLivro: {
    //     type: mongoose.SchemaTypes.String,
    // },
    // sinopseLivro: {
    //     type: mongoose.SchemaTypes.String,
    // }
});

module.exports = mongoose.model('Livros', LivroSchema);