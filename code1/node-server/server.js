const express =  require('express');
const hbs = require('hbs');
const fs = require('fs');
var port = process.env.PORT || 3000
var app = express();
app.use((req,res,next)=>{
	var now = new Date().toString();
	var log = `${now} \t ${req.method} ${req.url}`;
	fs.appendFileSync("server-log.txt",log+"\n")
	next();
})

hbs.registerPartials(__dirname+'/views/partials');
app.set("view engine","hbs");

hbs.registerHelper('year',()=>{
	return new Date().getFullYear()
})

hbs.registerHelper('capitalize',(word)=>{
	return word.toUpperCase();
})
app.use(express.static(__dirname+'/public')); 


app.get('/',(req,res)=>{
	res.render('index.hbs',{
		pageTitle: "Index Page",
		name: "Fahid",
		welcome: "Hi"
		 
	})
})


app.get('/bad',(req,res)=>{
	res.send({
		error: "The requested message is an error"
	})
})

app.get('/about',(req,res)=>{
	res.render('about.hbs',{
		name: "Fahid",
		welcome: "Hi",
		pageTitle: "About Page"
		
	})
})
app.get('/home',(req,res)=>{
	res.render('home.hbs',{
		name: "Fahid",
		welcome: "Hi",
		pageTitle: "home Page"
		
	})
})
app.get('/project',(req,res)=>{
	res.render('project.hbs')
})

app.listen(port,()=>{
	console.log("Server is listening at port ",port)
})