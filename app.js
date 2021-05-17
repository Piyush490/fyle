const client = require('./Database Queries/database')
const express = require('express');
var cors = require('cors')
const app = express();
const routes = require('./routes/routes');
const path = require('path')

const port = process.env.PORT || 8080;

app.use(cors())

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "client/build")))
}

app.listen(port, () => {
    console.log('server started at '+ port);
    client.connect(() => {
        console.log('database connected')
    });
})



app.use('/',routes);
