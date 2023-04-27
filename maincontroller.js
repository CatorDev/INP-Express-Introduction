// import express
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const mysql = require('mysql2')
const fs = require('fs')
const db = require('./db.js')

// setup express
const app = express()

// middleware
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.set('view engine', 'ejs')

const port = 8000;
const hostname = "localhost"

// Verzeichnis für statische Dateien
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req,res) => {
    //res.sendFile('/html/main.html', {root: root})
    db.query('SELECT * FROM movie', (error,results) => {
        if(error){
            // send error message
            return res.status(500).send('Internal Server Error')
        }
        res.render('main',{
            movies: results,
        })
    })
})

// if the url is not valid, the 404 page will be sent as a response 
// '*' -> default case
/*app.get('*', function(req,res){
    res.sendFile('/views/404.ejs', {root: root})
})*/

const server = app.listen(port,hostname, () => {
    console.log(`Server started on http://${hostname}:${port}/`)
})

// Import des socket.io-Moduls und Verbindung mit Express-Server
const io = require('socket.io')(server)

io.on('connection', (socket) => {
    console.log(`Socket Connection Successfull:`)
})

