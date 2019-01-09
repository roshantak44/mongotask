var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var weburls = require('./models/weburls');
var app = express();
var url = "mongodb://localhost:27017/nodem";
var port = 3000;
 
// all environments
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
 
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true)
mongoose.connect(url, { useNewUrlParser: true });


app.get('/weburls/:domainname', function(req, res, next){
    var domainname = req.params.domainname;
    console.log('home');
    weburls.find({domain: domainname}, function(err, eachOne){
        if (err){
            next(err);
            res.send("error is there");
          }
          else{
    console.log(req);
    res.json(eachOne.length);
    console.log(eachOne);
             }
            });
});
app.post('/weburls/report',function(req,res){
    console.log("Boom");
    const q1 = weburls.find({$or: [{$where: "this.phone.length>0"}, {$where: "this.mobile.length>0"}, {$where: "this.email.length>0"}]},{_id:1}).exec(function(err,item1){
    console.log("boom1");
    if(!err && item1)
    {   
    const q2= weburls.find({isCrawled : false, depth : 1},{_id:1}).exec(function(err,item2){   
    console.log("boom2");
    if(!err && item2)
    {
    const q3= weburls.find({isCrawled : true},{_id:1}).exec(function(err,item3){
    console.log("boom3");
    if(!err && item3)
    {
        var obj={};
        obj.q1=item1.length;
        obj.q2=item2.length;
        obj.q3=item3.length;
    res.json(obj);
    console.log(obj);
    }    
    });
    }                    
    });    
    }
    else
        {
            console.log("Error: " + err);
            res.json({message: "Error in mongo"});
        }
    });    
});
app.get('/dgt2', function(req, res){
    console.log('home');
	weburls.find(({depth: {'$gt':2}}), function (err, eachOne) {
    console.log(req);
    res.json(eachOne.length, {hello: 'hlw'});
    console.log(eachOne);
    });
});
app.get('/dgto2', function(req, res){
    console.log('home');
	weburls.find(({depth: {'$gt':2}}), function (err, eachOne) {
    console.log(req);
    res.json(eachOne.length);
    console.log(eachOne);
    res.end('I am done');
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
	weburls.find({"url.protocol": "http:"}).then(eachOne => {
    res.json(eachOne);
    console.log(eachOne);
	});
});

app.listen(port, function(){
    console.log('hii i am listing to '+port);
});