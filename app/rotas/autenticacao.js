
router.route('/authenticate')

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
.post(function(req, res) {

//  var user_id = req.params.user_id;
console.log(req.body.password);
 //validation
    req.assert('','Descricao is required').notEmpty();
    req.assert('idfProduto','Descricao is required').notEmpty();

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  




     //get data
    var data = {
        username:req.body.username,        
        password:req.body.password
     };

    req.getConnection(function(err,conn){

        if (err)
            res.json({ success: false, message: 'Falha na conexão com o banco de dados.' ,codigo:1});

        var query = conn.query("select username,password from tblUsers  where username  = ? ",[data.username],function(err,rows,fields){
              if (err) throw err;                          
                                              
              if (!rows|| (rows.length==0) ){
                  res.json( {success: false, message: 'Authentication failed. User not found.',codigo:1});
                  
              } else if (rows) {
              

              // check if password matches
              if (rows[0].password != req.body.password) {
                  res.json({ success: false, message: 'Authentication failed. Wrong password.',codigo:2 });
              } else {

                console.log('Autenticado');
                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign(rows, app.get('superSecret'), {
                    expiresInMinutes: 1440 // expires in 24 hours
                    });

                    // return the information including token as JSON
                    debugger;
                      res.json({
                          codigo:0,
                          success: true,                          
                          token: token
                        });                    
                      debugger
            }

          }        
    })
  })
})