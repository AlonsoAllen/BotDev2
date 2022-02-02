const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
    description: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    userId: {
        type: mongoose.SchemaTypes.String,
        required: true,
    }
});

module.exports = mongoose.model('Note', NoteSchema); 

// Sem vínculo com nossas tasks. Lembrar de apagar depois.