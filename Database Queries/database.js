const {Client} = require('pg');
require("dotenv").config();

const devConfig = {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE

}

const proConfig = {
    connectionString: process.env.DATABASE_URL
}

const client = new Client(process.env.NODE_ENV === 'production' ? proConfig : devConfig)

module.exports = client