const express = require('express');
const {Pool} = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');

const con_setting = require('./config/db');
const TABLE_NAME = "space_war_ranking"

const hostName = "127.0.0.1";
const port = 3333;

const pool = new Pool(con_setting);
const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

pool.connect();


app.post("/ranking/add",(req, res)=>{
  const data = req.body;
  const sql = {
    text : 'insert into space_war_ranking(name, message, score) values($1,$2,$3)',
    values : [data.name, data.message, data.score]
  }
  pool.query(sql, (err,dbRes)=>{
    if(err) throw err;
    res.send("Success!!");
  });
});

app.get("/ranking/:max",(req, res)=>{
  const max = req.params.max;
  pool.query(`select * from ${TABLE_NAME} order by score desc limit ${max}`, (err,dbRes)=>{
    if(err) throw err;
    res.send(dbRes.rows);
  });
});

app.get("/",(req,res)=>{
  res.redirect("/ranking");
});





app.listen(port, ()=>{
  console.log(`==== Server is running : http://${hostName}:${port}`);
});


