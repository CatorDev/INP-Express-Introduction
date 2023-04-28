const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'inp_filme'
})

connection.connect((error) => {
    if(error){ 
        console.log('Database connection error')
        console.log(error)
    } else {
        console.log('Database Connection successfull')
    }
})

module.exports = connection;