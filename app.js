var express=require('express');
var app=express();
var bodyParser=require('body-parser');



app.use(bodyParser.json());
app.set('view engine','ejs');

var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/newDB',{useNewUrlParser:true});
const Schema=mongoose.Schema;
const structure=new Schema({
    name:String,
    password:String,
});
const Model=mongoose.model('Model',structure);

app.get('/',(req,res)=>{
    res.render('index');
});

app.post('/form',(req,res)=>{
 var user=new Model(req.body);
 user.save().then(()=>{
     console.log('saving the input...')
 });
    res.redirect('/home');
});
app.get('/home',(req,res)=>{
    res.render('app');
});

app.get('/h',(req,res)=>{
    res.render('indexLogin')
});
app.post('/login',(req,res)=> {
    var name=req.body.name;
    var password=req.body.password;
    Model.findOne({name:name,password:password},(err,user)=>{
        if(err){
            console.log(err);
            return res.status(500).send();
        }
        if(user===null) {
            res.render('failedLogin')
        }else{
           res.render('app2');
        }

    })
});
/*app.get('/home2',(req,res)=>{
    res.render('app2');
});*/



app.listen(7223,()=>{
    console.log('done');
});