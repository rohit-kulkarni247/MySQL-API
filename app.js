//jshint version:6


const express=require('express');
const mysql=require('mysql');
const bodyparser=require('body-parser');

//create Connection
const db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwerty',
    //database: 'nodemysql' //write this after creating the database
});

const app=express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));





let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port,()=>{
  console.log("server running on port 3000");
});