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

