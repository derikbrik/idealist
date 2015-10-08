var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProdutoSchema   = new Schema({
	ProdCodigo: Number,
    ProdDescricao: String,
    ProdCodigoDeBarra: String,
    ProdUnidade: String,
    ProdCategoria: String

});

module.exports = mongoose.model('produto', ProdutoSchema);