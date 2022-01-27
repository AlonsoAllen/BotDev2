const { Double } = require("mongodb");
const mongoose = require("mongoose");  

const ObraSchema = new mongoose.Schema({ //alterei tudo pra letra minuscula
    username: mongoose.SchemaTypes.String,
    discordId: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    description: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    nome_obra: {
        type: mongoose.SchemaTypes.String,
        required: false,
    },
    id_obra: {
        type: mongoose.SchemaTypes.Number,
        required: false,  //apagar amanha
    }
});

/*obraSchema.methods.findObra = function(cb) {
    return mongoose.model('Obra').find({ nome_obra: this.nome_obra }, cb);
  };// só consigo chamar aqui no schema*/


module.exports = mongoose.model('Obra', ObraSchema); 