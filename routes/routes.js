const client = require('../Database Queries/database')
const app=require('express').Router();

app.get('/api/branches/autocomplete', async(req, res) => {
    var branch = req.query.q;
    const limit = req.query.limit
    const offset = req.query.offset
    branch = branch.toLowerCase();

    client.query(`SELECT * FROM bank_branches
    WHERE lower(branch) LIKE '%${branch}%'
    ORDER BY ifsc
    LIMIT ${limit} OFFSET ${offset}` )

    .then((result) => {
        if(result.rowCount == 0)
            res.json({mess: "no matches found"})
        else
            res.send(result.rows);
    })

    .catch( err => {
        console.log(err);
    })
})

app.get('/api/branches', async(req, res) => {
    let search = req.query.q;
    const limit = req.query.limit
    const offset = req.query.offset
    search = search.toLowerCase();

    client.query(`SELECT * FROM bank_branches
    WHERE lower(branch)='${search}'
    OR lower(city)='${search}'
    OR lower(state)='${search}'
    OR lower(ifsc)='${search}'
    OR lower(bank_name)='${search}'
    OR lower(address)='${search}'
    OR lower(district)='${search}'
    ORDER BY ifsc
    LIMIT ${limit} OFFSET ${offset}` )

    .then((result) => {
        if(result.rowCount == 0)
            res.json({mess: "no matches found"})
        else
            res.send(result.rows);
    })

    .catch( err => {
        console.log(err);
    })
})


module.exports=app;