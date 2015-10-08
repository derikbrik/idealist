////////////////////////////////////////////////////////////////////////////////////////
// Users
///////////////////////////////////////////////////////////////////////////////////////
router.route('/users')

//show the CRUD interface | GET
.get(function(req,res,next){
	
    req.getConnection(function(err,conn){
        
        	if (err)
				res.send(err);
        			
        			var query = conn.query('SELECT * FROM tblusers',function(err,rows){
            if(err){                
				res.send(err);
            }
            res.json({rows});
         });

    });

})
//post data to DB | POST
.post(function(req,res,next){

    //validation
    req.assert('username','Name is required').notEmpty();
    req.assert('email','A valid email is required').isEmail();
    req.assert('password','Enter a password 6 - 20').len(6,20);

    var errors = req.validationErrors();
    if(errors){
        res.status(422).json(errors);
        return;
    };

    //get data
    var data = {
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
     };

    //inserting into mysql
    req.getConnection(function (err, conn){

        if (err) return next("Cannot Connect");

        var query = conn.query("INSERT INTO tblusers set ? ",data, function(err, rows){

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
router.route('/user/:user_id')

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

    var user_id = req.params.user_id;

    req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");

        var query = conn.query("SELECT * FROM tblusers WHERE idUser = ? ",[user_id],function(err,rows){

            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }

            //if user not found
            if(rows.length < 1)
                return res.send("User Not found");

            res.json({rows});
        });

    });

})

//update data
.put(function(req,res,next){
    var user_id = req.params.user_id;

    //validation
   // req.assert('username','Name is required').notEmpty();
    req.assert('email','A valid email is required').isEmail();
    req.assert('password','Enter a password 6 - 20').len(6,20);

    var errors = req.validationErrors();
    if(errors){
        res.status(422).json(errors);
        return;
    }

    //get data
    var data = {
        //username:req.body.username,
        email:req.body.email,
        password:req.body.password
     };

    //inserting into mysql
    req.getConnection(function (err, conn){

        if (err) return next("Cannot Connect");

        var query = conn.query("UPDATE tblusers set ? WHERE idUser = ? ",[data,user_id], function(err, rows){

           if(err){
                console.log(err);
                return next("Mysql error, check your query");
           }

          res.status(200).json();

        });

     });

})

//delete data
.delete(function(req,res,next){

    var user_id = req.params.user_id;

     req.getConnection(function (err, conn) {

        if (err) return next("Cannot Connect");

        var query = conn.query("DELETE FROM t_user  WHERE idProduto = ? ",[user_id], function(err, rows){

             if(err){
                console.log(err);
                return next("Mysql error, check your query");
             }

             res.sendStatus(200);

        });
        //console.log(query.sql);

     });
});
