const express = require('express');
const {Pool} = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');

const con_setting = require('./config/db');
const initDbQueries = require('./initQueries');
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
  pool.query(sql, (err,rows)=>{
    if(err) throw err;
    res.send("Success!!");
    pool.end();
  });
});

app.get("/ranking",(req, res)=>{
  pool.query(`select * from ${TABLE_NAME}`, (err,rows)=>{
    if(err) throw err;
    res.send(rows);
    pool.end();
  });
});

app.get("/",(req,res)=>{
  res.redirect("/ranking");
})




