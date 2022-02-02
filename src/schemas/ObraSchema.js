const mongoose = require('mongoose')

const ObraSchemas = mongoose.Schema({
    nomeObra: {
        type: String,
    },
    autorObra: {
        type: String,
    },
    generoTextualObra: {
        type: String,
    },
    linkAcessoObra: {
        type: String,
    },
    faixaEtariaObra: {
        type: String,
    },
    statusObra: {
        type: String,
    },
    generoObra: {
        type: Array,
    },
    sinopseObra: {
        type: String,
    }
});

module.exports = mongoose.model('Obras', ObraSchemas);

// Nome alterado para o padrão definido nas nossas tasks.