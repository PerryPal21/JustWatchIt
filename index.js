const express = require('express');
const fs = require('fs')
//const chalk = require('chalk')
const StormDB = require("stormdb");
const movieart = require("movie-art")
const app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname))

const engine = new StormDB.localFileEngine("./db.stormdb");
const db = new StormDB(engine);

app.get('/', (req, res) => {
  

linkArr = []
imageArr = []

var operationsCompleted = 0;
var fileTotal;
console.log(db.get().state.movie)
var obj = db.get().state.movie

fileTotal = Object.keys(db.get().state.movie).length
console.log(fileTotal)

function operation() {
   ++operationsCompleted;
   if (operationsCompleted === fileTotal*2) {
     console.log("Dashboard Rendered")
     res.render("dashboard", {
       links: linkArr,
       image: imageArr
     })
   };
}

for (var i = 0; i < obj.length; i++) {
  if (obj[i].link) {
    linkArr.push(obj[i].link)
    console.log("Pushed " + obj[i].link)
    operation()
  }
}

for (var i = 0; i < obj.length; i++) {
  if (obj[i].img) {
    imageArr.push(obj[i].img)
    console.log("Pushed " + obj[i].img)
    operation()
  }
}})

/* 
app.get('/', (req, res) => {
  res.format({
  "text/plain": () => res.send(chalk.blue('ERROR 404')),
  "text/html": () => res.write(`Nothing to see here`),
  "default": () => res.send(chalk.blue('ERROR 404'))
  });
}); */



app.get('/movie', (req, res) => {
  console.log(req.query)
  var pass = req.query.pass
  var name = req.query.name
  var link = req.query.link
  var urlname = name.replace(" ","%20")
if (pass === "perrypost") {
  movieart(name, (error, response) => {
    db.get("movie").push({ 
    "name": name,
    "link":`https://clouddb.perrypal21.repl.co/watch?link=${link}&name=${urlname}`,
    "img":response
  })
  db.save()
  })

  res.send("Added to Database")
 }else {
  res.send("Authentication failed :(")
 
 }})





app.get("/watch", (req, res) => {
  var vidID = req.query.link
  var vidname = req.query.name

  res.render("watch", {
  link: vidID,
  name: vidname
  })
  })




app.listen(3004, () => {
  console.log('Server Started');
})
