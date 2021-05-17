const client = require('./database');
const fs = require('fs');
const fastcsv = require("fast-csv")

let stream = fs.createReadStream('./branches.csv');
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
      "INSERT INTO branches (ifsc, bank_id, branch, address, city, district, state) VALUES ($1, $2, $3, $4, $5, $6, $7)";
    
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