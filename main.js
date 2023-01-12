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