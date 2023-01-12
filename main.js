// import express
const express = require('express');
const fs = require('fs')

// setup express
const app = express()

// port
const port = 8000;

// prepare product pages
const hostname = "localhost"

// setup static folder, so the users browser can access files within
app.use(express.static('public'))

const root = './public'

app.get('/', (req,res) => {
    res.sendFile('/html/main.html', {root: root})
})

// if the url is not valid, the 404 page will be sent as a response 
// '*' -> default case
app.get('*', function(req,res){
    res.sendFile('/html/404.html', {root: root})
})

app.listen(port,hostname, () => {
    console.log(`Server started on http://${hostname}:${port}/`)
})