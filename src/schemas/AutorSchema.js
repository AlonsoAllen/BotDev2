const mongoose = require('mongoose')

const AutorSchema = mongoose.Schema({
    nomeAutor: {
        type: String,
    },
    generoLiterarioAutor: {
        type: String,
    },
    linkRedeSocialAutor: {
        type: String,
    }
});

module.exports = mongoose.model('Autores', AutorSchema);

//Todo autor tem uma obra e temos um banco não-relacional, então não tem porquê criarmos um autor separado, pois não temos vinculo entre os elementos. Apagar esse schema após terminar os testes.