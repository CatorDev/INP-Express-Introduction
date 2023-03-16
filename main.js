// import express
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const mysql = require('mysql2')
const fs = require('fs')
const db = require('./db.js')

// setup express
const app = express()

//middleware
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.set('view engine', 'ejs')

const port = 8000;
const hostname = "localhost"

// setup static folder, so the users browser can access files within
app.use(express.static('public'))

const root = './public'

app.get('/', (req,res) => {
    //res.sendFile('/html/main.html', {root: root})
    db.query('SELECT * FROM game', (error,result) => {
        if(error){
            // send error message
            return res.status(500).send('Internal Server Error')
        }
        res.render('main',{
            games: result,
        })
    })
})

// if the url is not valid, the 404 page will be sent as a response 
// '*' -> default case
app.get('*', function(req,res){
    res.sendFile('/html/404.html', {root: root})
})

app.listen(port,hostname, () => {
    console.log(`Server started on http://${hostname}:${port}/`)
})