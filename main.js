// import express
const express = require('express');
const fs = require('fs')

// setup express
const app = express()

// port
const port = 8000;

// prepare product pages
const hostname = "localhost"


    // reads csv file
    const csv = fs.readFileSync('./data/gpu.csv',"utf-8")

    // splits csv data in rows
    const products = csv.split('\n')
    products.shift();
    
    let splitProducts = record => {

        // split each data, when a ',' is found
        const fields = record.split(',')
        
        // read html file
        let html = fs.readFileSync('./public/html/product_template.html', "utf-8")
        
        html = html.replaceAll('{name}', fields[0])
        html = html.replaceAll('{description}', fields[1])
        html = html.replaceAll('{clock_speed}', fields[2])
        html = html.replaceAll('{memory_type}', fields[3])
        html = html.replaceAll('{memory_size}', fields[4])
        html = html.replaceAll('{shading_units}', fields[5])
        html = html.replaceAll('{amount}', fields[6])
        html = html.replaceAll('{price}', fields[7])
        html = html.replaceAll('{image_url}', fields[8])

        return html;
    }

    const pages = products
        .filter(row => row !== "")
        .map(splitProducts);

// setup static folder, so the users browser can access files within
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

app.get('/category/gpu1', (req,res) => {
    res.sendFile(pages[0])
})

app.get('/rx5600xt', (req,res) => {
    res.sendFile('./public/images/rx5600xt.jpg', {root: __dirname})
})

app.get('/category/gpu2', (req,res) => {
    res.sendFile(pages[1])
})

app.get('/rtx2060', (req,res) => {
    res.sendFile('./public/images/rtx2060.jpg', {root: __dirname})
})

// if the url is not valid, the 404 page will be sent as a response 
// '*' -> default case
app.get('*', function(req,res){
    res.sendFile('./public/html/404.html')
})

app.listen(port,hostname, () => {
    console.log(`Server started on http://${hostname}:${port}/`)
})