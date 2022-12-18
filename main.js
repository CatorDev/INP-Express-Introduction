// import express
const express = require('express');

// setup express
const app = express()

// port
const port = 8000;

const hostname = "localhost"

// imports readcsv.js
const readcsv = require('./app/readcsv')

// setup static folder, so the user can access
app.use(express.static('public'))

app.get('/', (req,res) => {
    res.sendFile('./public/html/main.html', {root: __dirname})
})

app.get('/category/gpu', (req,res) => {
    res.sendFile('./public/html/category/gpu.html', {root: __dirname})
})

app.get('/category/cpu', (req,res) => {
    res.sendFile('./public/html/category/cpu.html', {root: __dirname})
})

// if the url is not valid, the 404 page will be sent as a response 
// '*' -> default case
app.get('*', function(req,res){
    res.sendFile('./public/html/404.html', {root: __dirname})
})

app.listen(port,hostname, () => {
    console.log(`Server started on http://${hostname}:${port}/`)
})
