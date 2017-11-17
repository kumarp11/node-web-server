const port=process.env.PORT || 3000; //process.env conatins all environment varibles of your syetem
const express=require('express');  // adding express library to code
const hbs=require('hbs'); // This library can be used to inject dynamic content into webpages
const app=express(); //creating express app
const fs=require('fs');


hbs.registerPartials(__dirname+'/views/partials') //This is to register partials

app.set('view engine','hbs') //setting up view engine as hbs

//This is also one use express middleware
app.use((req,res,next)=>{
var now=new Date();
var log=`${now} ` + `${req.method} `+`${req.url}`
console.log(log)
fs.appendFile('server.log',log +'\n',(err)=>{
  if(err){console.log('can not appned to file')}
})
next();
})

app.use((req,res,next)=>{
  res.render('maintainence.hbs');
})

app.use(express.static(__dirname+'/public'));//express middleware -setting up a static directory, __dirname comtains the project directory path

app.get('/',(req,res)=>{
  //res.send('Hello Express'); //This is the response for HTTP get request
  res.send({
    name:'Prashant',
    likes:['girls','swimming']
  }); // this is sending JSON back as a response
});//this is used to handle the HTTP get request. This particular case handles HTTP get request to the root of application

app.get('/about',(req,res)=>{
//  res.send('About Page');
res.render('about.hbs',{
  pagetitle:'Help page',
  currentyear:new Date().getFullYear()
});
})

app.get('/bad',(req,res)=>{
  res.send({
    errormessage:"This is a bad code"
  });
})
app.listen(port,()=>{console.log('server is up at port ' + `${port}`)}); //This is used to specify the port or to bind a port with application. Application will listen to this port on localhost(in this case)
//for requests
