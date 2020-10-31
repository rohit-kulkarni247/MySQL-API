//jshint version:6


const express=require('express');
const mysql=require('mysql');
const bodyparser=require('body-parser');

//create Connection
const db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwerty',
    database: 'nodemysql' //write this after creating the database
});

//connect
db.connect((err)=>{
    if(err){
       throw err;
    }
    console.log("MySQL Connected");
});

const app=express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// create database
app.get("/createdb",(req,res)=>{
    let sql='CREATE DATABASE nodemysql';
    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send("Database created");
    });
});

//create table
app.get("/createtable",(req,res)=>{
    let sql='CREATE TABLE players(id int auto_increment, name varchar(255), position varchar(255), PRIMARY KEY (id))';
    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send("table created");
    });
});

//insert values
app.get("/insert1",(req,res)=>{
    let post={name:"lionel messi", position:"right winger"};
    let sql='INSERT INTO players SET ?';
    let query = db.query(sql,post,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send("added player 1");
    });
});

app.get("/insert2",(req,res)=>{
    let post={name:"vincent kompany", position:"center back"};
    let sql='INSERT INTO players SET ?';
    let query = db.query(sql,post,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send("added player 2");
    });
});

//read data from database
app.get("/getvalues",(req,res)=>{
    let sql='select * from players';
    let query = db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send("Fetched data from database");
    });
});

//select single value from database
app.get("/getvalue/:id",(req,res)=>{
    let sql=`select * from players where id=${req.params.id}`;
    let query = db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send("Fetched value from database");
    });
});

//update value
app.get("/updatevalue/:id",(req,res)=>{
    let newname="Sergio Ramos";
    let sql=`update players set name= '${newname}' where id=${req.params.id}`;
    let query = db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send("updated a value");
    });
});




let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port,()=>{
  console.log("server running on port 3000");
});