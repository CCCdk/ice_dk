const express = require("express");
const bodyParser =require('body-parser')
const app=express();
//解析应用程序/x-wwww-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}))
// 解析application/json
app.use(bodyParser.json())

const port=3000
// 导入配置
const config=require('./config')
app.get('/',(req,res)=>{
    res.send('Hello World!')
})
// 导入mysql
var mysql=require('mysql')
// 创建连接
var connection =mysql.createConnection(config.mysql)

//get请求，返回json格式list数据
app.get('/get',(req,res)=>{
    var sql='SELECT * FROM Book';
    if(req.query.BookName){
        sql=`SELECT * FROM Book Where BookName Like '${req.query.BookName}'`
    }
    connection.query(sql,(err,rows)=>{
        if(!err) {res.send(rows)}
        else{
            res.send(err);
        }
    })
})


app.post('/add',(req,res)=>{
    var sql=`
    INSERT INTO Book(BookName,Author,TypeName,Remarks)
    VALUES('${req.body.BookName}','${req.body.Author}','${req.body.TypeName}','${req.body.Remarks}')
    `;

    connection.query(sql,(err,rows)=>{
        if(!err) {res.send("操作成功！")}
        else{
            res.send(err);
        }
    })
})


app.post('/edit',(req,res)=>{
    var sql=`
    UPDATE Book SET BookName='${req.body.BookName}'
    ,Author='${req.body.Author}'
    ,TypeName='${req.body.TypeName}'
    ,Remarks='${req.body.Remarks}'
    WHERE Id=${req.body.Id}
    `;

    connection.query(sql,(err,rows)=>{
        if(!err) {res.send("操作成功！")}
        else{
            res.send(err);
        }
    })
})


app.get('/del',(req,res)=>{
    var sql=`DELETE FROM Book WHERE Id='${req.query.Id}'`;
    connection.query(sql,(err,rows)=>{
        if(!err) {res.send("操作成功!")}
        else{
            res.send(err);
        }
    })
})


app.listen(port,()=>{
    console.log("Good");
})