var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ItemProdutoSchema   = new Schema({	 
            Produto:{type: mongoose.Schema.Types.ObjectId, ref: 'Produtos' },
            Preco:Number,           
            Estabelecimento: { type: mongoose.Schema.Types.ObjectId,ref:'Estabelecimento'}
    });

module.exports = mongoose.model('ItemProduto', ItemProdutoSchema);