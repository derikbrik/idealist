var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EstabelecimentoSchema   = new Schema({
	EstabCodigo: Number,
    EstabDescricao: String    
});

module.exports = mongoose.model('Estabelecimento',EstabelecimentoSchema);