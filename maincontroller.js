// import express
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const mysql = require('mysql2')
const db = require('./app/db')

// setup express
const app = express()

// middleware
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.set('view engine', 'ejs')

const port = 8000;
const hostname = "localhost"

// Verzeichnis für statische Dateien
app.use(express.static(path.join(__dirname, 'views')))
app.use(express.static(path.join(__dirname, 'public')))

// Routen definieren
app.get('/', (req,res) => {
    // Sql Query um alle Filme abzurufen
    db.query('SELECT * FROM film', (error,results) => {
        if(error){
            // send error message
            return res.status(500).send('Internal Server Error')
        }
        res.render('index',{
            movies: results,
        })
    })
})

// Route zum Filme hinzufügen
app.post('/movies', (req,res) => {

    // daten extrahieren
    const{title, description, rating, image} = req.body

    db.query(
        'INSERT INTO film(titel,beschreibung,genre,bewertung,bild'
    )

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

// Hört auf Verbindung von socket.io Clients
io.on('connection', (socket) => {
    console.log(`Socket Connection Successfull: ${socket.id}`)
})

