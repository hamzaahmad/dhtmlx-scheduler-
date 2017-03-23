var express=require('express');
var favicon = require('serve-favicon')
var path = require('path');
var validator = require('express-validator')
var bodyParser = require('body-parser')
var cluster = require('cluster');
var helmet = require('helmet');
var cookieParser = require('cookie-parser')
var csrf = require('csurf')


var port    = 3000;
var root    = path.dirname( __dirname );
var cCPUs   = require('os').cpus().length;


if( cluster.isMaster ) {
  for( var i = 0; i < cCPUs; i++ ) {
    cluster.fork();
  }
  cluster.on( 'online', function( worker ) {
    console.log( 'Worker ' + worker.process.pid + ' is online.' );
  });
  cluster.on( 'exit', function( worker, code, signal ) {
    console.log( 'worker ' + worker.process.pid + ' died.' );
  });
}
else {
var db = require('mongoskin').db("mongodb://localhost/taskmanger", { w: 0});
    db.bind('event');
var app = express();
app.use(helmet())
app.set('view engine','jade')
/////////////////////////////////////////////////////////////////
var csrfProtection = csrf({ cookie: true })
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.use(validator())
app.use(cookieParser())
app.get('/',csrfProtection,function(req,res){

res.render('login')

})

app.post('/login',function(req,res){
	console.log(req.body)
if(req.body.user==="laithlaithlaith" && req.body.password==="laithlaithlaith"){
  res.render('index')
}else{
res.render('login')
}
})



app.get('/task',function(req,res){
		db.event.find().toArray(function(err, data){
		//set id property for all records
		for (var i = 0; i < data.length; i++)
			data[i].id = data[i]._id;
	res.render('index',{data:data})
	});
	
})


app.get('/data', function(req, res){
	db.event.find().toArray(function(err, data){
		//set id property for all records		
		for (var i = 0; i < data.length; i++)
			data[i].id = data[i]._id;
		res.send(data);
	});
});
app.post('/data', function(req, res){
	var data = req.body;
	var mode = data["!nativeeditor_status"];
	var sid = data.id;
	var tid = sid;
	delete data.id;
	delete data.gr_id;
	delete data["!nativeeditor_status"];
	function update_response(err, result){
		if (err)
			mode = "error";
		else if (mode == "inserted")
			tid = data._id;
		res.setHeader("Content-Type","text/xml");
		res.send("<data><action type='"+mode+"' sid='"+sid+"' tid='"+tid+"'/></data>");
	}
	if (mode == "updated")
		db.event.updateById( sid, data, update_response);
	else if (mode == "inserted")
		db.event.insert(data, update_response);
	else if (mode == "deleted")
		db.event.removeById( sid, update_response);
	else
		res.send("Not supported operation");
});

app.get('*',function(req,res){
	res.send('nothing here ')
})

app.listen(port,function(req,res){
console.log('Server start at port ' + port)
})
}
