const client = require('./database');
const fs = require('fs');
const fastcsv = require("fast-csv")

let stream = fs.createReadStream('./banks.csv');
let csvData = [];
let csvStream = fastcsv
  .parse({
      delimiter:"\t"
  })
  .on("data", (data) => {
    csvData.push(data);
  })

  .on("end",() => {
    const query =
      "INSERT INTO banks (name, id) VALUES ($1, $2)";
    
      client.connect((err, client, done) => {
          if(!err){
              csvData.forEach( row =>{
                  client.query(query, row, (err,res) =>{
                    if (err) {
                        console.log(err.stack);
                      } else {
                        console.log("inserted " + res.rowCount + " row:", row);
                      }
                  })
              })
          }
      })
  })
  
  stream.pipe(csvStream);