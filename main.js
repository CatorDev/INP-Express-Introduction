const express = require('express')
const app = express()
const path = require('path')
const port = 8080;

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

app.listen(port, () => {
    console.log(`Listening in on port ${port}`)
})
