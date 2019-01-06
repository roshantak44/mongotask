var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var weburls = require('./models/weburls');
var app = express();
var url = "mongodb://roshan:roshantak44@ds147734.mlab.com:47734/nodemo";
var port = 3000;
 
// all environments
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
 
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true)
mongoose.connect(url, { useNewUrlParser: true });


app.get('/dbusiness', function(req, res){
    console.log('home');
	weburls.find({domain:"business"}).then(eachOne => {
    res.json(eachOne);
    console.log(eachOne);
	});
});
app.get('/dgt2', function(req, res){
    console.log('home');
	weburls.find({depth: {'$gt':2}}).then(eachOne => {
    res.json(eachOne);
    console.log(eachOne);
	});
});
app.get('/errort', function(req, res){
    console.log('home');
	weburls.find({"_error":true}).then(eachOne => {
    res.json(eachOne);
    console.log(eachOne);
	});
});
app.get('/uph', function(req, res){
    console.log('home');
	weburls.find({ "url.protocol": "http:"}).then(eachOne => {
    res.json(eachOne);
    console.log(eachOne);
	});
});

app.listen(port, function(){
    console.log('hii i am listing to '+port);
})