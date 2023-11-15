const express = require('express');
const {Pool} = require('pg');
const con_setting = require('./config/db');
const initDbQueries = require('./initQueries');
const pool = new Pool(con_setting);

const TABLE_NAME = "space_war_ranking"

pool.connect();

pool.query(`select * from ${TABLE_NAME}`, (err,res)=>{
  console.log(res.rows);
  pool.end();
});

