const mongoose = require("mongoose");  

const FormSchema = new mongoose.Schema({ //alterei tudo pra letra minuscula
    username: mongoose.SchemaTypes.String,
    discordId: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    description: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    nome: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    regiao: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    idade: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
});

module.exports = mongoose.model('Form', FormSchema); 