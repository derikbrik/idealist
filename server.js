	
	var morgan     	= require('morgan');
 	var express  	= require('express');
	jwt    			= require('jsonwebtoken');    
    bodyParser 		= require('body-parser'),
    app 			= express();
    expressValidator = require('express-validator');
    var config = require('./config');

app.use(morgan('dev')); // log requests to the console 
//app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true })); //support x-www-form-urlencoded
app.use(bodyParser.json());
app.use(expressValidator());

app.set('superSecret', config.secret);

/*MySql connection*/
var connection  = require('express-myconnection'),
    mysql = require('mysql');
app.use(

    connection(mysql,{
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'idealist',
        debug    : true //set true if you wanna see debug logger
    },'request')

);


//RESTful route
router = express.Router();

//Rota para autenticacao
var route_authenticate = require('./app/rotas/autenticacao');




router.use(function(req, res, next) {
	console.log('Algo está acontecendo.');

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  

  
  // Verificar header e parametros  para token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    		jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      			if (err) {
        				return res.json({ success: false, message: 'Failed to authenticate token.' });    
      			} else {
        				// if everything is good, save to request for use in other routes
        			req.decoded = decoded;    
              console.log('autenticado')
        			next();
      			}
    		});

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
	//next();    
});

app.get('/',function(req,res){

    res.json({ message: 'Api-IdealList funcionando!'});	

});


//demais rotas
var route_user = require('./app/rotas/users');
var route_produtos = require('./app/rotas/produtos');
var route_estabelecimentos = require('./app/rotas/estabelecimentos');
var route_listas = require('./app/rotas/listas');
var route_listaProdutos = require('./app/rotas/listaProdutos');
var route_registro = require('./app/rotas/registrosdeprecos');

	
//now we need to apply our router here
app.use('/api', router);

//start Server
var server = app.listen(8083,function(){

	  console.log("Aguardamos você na porta %s",server.address().port);

});