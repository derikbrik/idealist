////////////////////////////////////////////////////////////////////////////////
// produtos
//////////////////////////////////////////////////////////////////////////////
router.route('/registrosdeprecos')

//show the CRUD interface | GET
.get(function(req,res,next){
	
    req.getConnection(function(err,conn){
        
        	if (err)
				res.send(err);
        			
        			var query = conn.query('SELECT * FROM tblRegistrosdeprecos',function(err,rows){
            if(err){                
				res.send(err);
            }
            res.json(rows);
         });

    });

})
//post data to DB | POST
.post(function(req,res,next){

    // todo:Fazer validacao
    req.assert('idfListaProduto','Descricao is required').notEmpty();
    
    var errors = req.validationErrors();
    if(errors){
        res.status(422).json(errors);
        return;
    };

    //get data
    var data = {              
      rgpPreco:req.body.rgpPreco,
      rgpDataDeRegistro:req.body.rgpDataDeRegistro,
      idfEstabelecimento:req.body.idfEstabelecimento,
      idfListaProduto:req.body.idfListaProduto      
     };



    //inserting into mysql
    req.getConnection(function (err, conn){

        if (err) return next("Cannot Connect");

        var query = conn.query("INSERT INTO tblRegistrosdeprecos set ? ",data, function(err, rows){

           if(err.code=='ER_DUP_ENTRY')
           {
                console.log('Registro duplicado.');                
                res.send('Registro duplicado.');
           }else
           {
           	return next("Mysql error, check your query");
           }
          
          res.status(200).json();

        });

     });

});


//now for Single route (GET,DELETE,PUT)
router.route('/registrosdeprecos/:registro_id')

/*------------------------------------------------------
route.all is extremely useful. you can use it to do
stuffs for specific routes. for example you need to do
a validation everytime route /api/user/:user_id it hit.
remove curut2.all() if you dont want it
------------------------------------------------------*/
/*.all(function(req,res,next){
    console.log("You need to smth about curut2 Route ? Do it here");
    console.log(req.params);
    next();
});*/

//get data to update
.get(function(req,res,next){

    var registro_id = req.params.registro_id;

    req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");

        var query = conn.query("SELECT * FROM tblRegistrosdeprecos WHERE idRegistrosDePrecos = ? ",[registro_id],function(err,rows){

            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }

            //if user not found
            if(rows.length < 1)
                return res.send("Produto Not found");

            res.json(rows);
        });

    });

})

//update data
.put(function(req,res,next){
    var registro_id = req.params.registro_id;

    //validation
    req.assert('idfListaProduto','Descricao is required').notEmpty();
    

    var errors = req.validationErrors();
    if(errors){
        res.status(422).json(errors);
        return;
    }

    //get data
     var data = {              
      rgpPreco:req.body.rgpPreco,
      rgpDataDeRegistro:req.body.rgpDataDeRegistro,
      idfEstabelecimento:req.body.idfEstabelecimento,
      idfListaProduto:req.body.idfListaProduto      
     };

    //inserting into mysql
    req.getConnection(function (err, conn){

        if (err) return next("Cannot Connect");

        var query = conn.query("UPDATE tblregistrosdeprecos set ? WHERE idRegistrosDePrecos = ? ",[data,registro_id], function(err, rows){

           if(err.code=='ER_DUP_ENTRY')
           {
                console.log('Registro duplicado.');                
                res.send('Registro duplicado.');
           }else
           {
            return next("Mysql error, check your query");
           }

          res.status(200).json();

        });

     });

})

//delete data
.delete(function(req,res,next){

    var registro_id = req.params.registro_id;

     req.getConnection(function (err, conn) {

        if (err) return next("Cannot Connect");

        var query = conn.query("DELETE FROM tblregistrosdeprecos  WHERE idRegistrosDePrecos = ? ",[registro_id], function(err, rows){

             if(err){
                console.log(err);
                return next("Mysql error, check your query");
             }

             res.sendStatus(200);

        });
        //console.log(query.sql);

     });
});

