const mongoose = require('mongoose')

const BasicSchema = mongoose.Schema({
    nome: {
        type: String,
    },
    sobrenome: {
        type: String,
    },
    linkQualquer: {
        type: String,
    }
});

module.exports = mongoose.model('Basic', BasicSchema);

