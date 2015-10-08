var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var ListaSchema   = new Schema({
	ListaCodigo: Number,
    ListaDescricao: String,
    ListaDataCreated: Date,
    ListaProdutos:[ {type: mongoose.Schema.Types.ObjectId, ref: 'produto' }]

    });


module.exports = mongoose.model('Lista', ListaSchema);