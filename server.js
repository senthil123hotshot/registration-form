//import all the packages
var express=require('express');
var app=express();
var path=require('path');
var validator=require('email-validator');
var bodyparser=require('body-parser');
var isEmpty=require('is-empty');
//var expresssession=require('express-session');
//body parser setup
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));
//database setup
var connection = require('./database/a').connection;
//view engine setup;
app.set('views',path.join(__dirname, 'views'));
  app.set('view engine', 'jade');
 app.get('/',function(req,res){
 	res.render('regi');
 })
app.post('/register', function(req ,res){
			var name=req.body.n1;
			var email=req.body.n2;
			var password=req.body.n3;
			var phoneno=req.body.n4;
				if(isEmpty(name) || isEmpty(email) || isEmpty(password)|| isEmpty(phoneno) ){
				
					res.send('fields are not empty' );
				
				}else{


					connection.query('select * from register where name="'+req.body.n1+'"',function(err,data){
						
								if(data[0].name == req.body.n1){
									res.send("name already exists");
								}else{
									console.log('done');
								}


							var x ={
								name : name,
								email :email,
								password : password,
								phoneno : phoneno
							}

						connection.query('insert into register set ?',x,function(err,data){
							if(err){
								res.send('query error insert not done');
							}else{
								res.send('data added');
							}
							
						});
						
					})

							
						
					}
					 });




					var q=connection.query('select name from register where name="'+req.body.name+'"');function(err,data){
						if(name===q)
						{
							res.send('name field already exists');
						}
						else
						{
							 fname=name;
						}
						})
						var q=connection.query('select email from register where email="'+req.body.email+'"',function(err,data){
						if(email===q)
						{
							res.send('email field already exists');
						}
						else if (validator.validate(email)) {
							femail=email;
						}
						else
						{
							res.send('enter correct valid email id');	
						}
						})
						var q=connection.query('select password from register where password="'+req.body.password+'"',function(err,data){
						if(password===q)
						{
							res.send('password field already exists');
						}
						else
						{
							fpassword=password;
						}
						})
					var q=connection.query('select phoneno from register where phoneno="'+req.body.phoneno+'"',function(err,data){
						if(phoneno==q)
						{
							res.send('phone no field already exists');
						}
						else
						{
							fphoneno=phoneno;
						}
						});
					var x={
						name:fname,email:femail,password:fpassword,phoneno:fphoneno
					};
					 connection.query('INSERT INTO register SET ?',x,function(err,data){
						if(err){
							res.send(err);
						}
						else
						{
							res.send('register successfully');
						}
					});

				}
				else
				{
					res.send('name must be >6 ,email must be >13 , password must between 6 to 10 and phoneno must 10 digits');
				}


 app.listen(2345);
