const client = require('./database');
const fs = require('fs');
var sql = fs.readFileSync('./indian_banks.sql').toString();

client.connect( (err,client) =>{
    client.query(sql);
    console.log("tables created");
});