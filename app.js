const express = require("express");
const exphbs = require("express-handlebars");
const fileupload = require("express-fileupload");
const mysql = require("mysql");
const Connection = require("mysql/lib/Connection");

const app = express();
const port = process.env.PORT || 5000;


app.use(fileupload());

//static files
app.use(express.static('public'))
app.use(express.static('upload'))

app.engine('hbs', require('exphbs'));
app.set('view engine', 'hbs');

//connection pool
const pool = mysql.createPool({
    connectionLimit :10,
    host: '127.0.0.1',
    user: 'root',
    port: '3306',
    password: '123123r',
    database: 'userprofile',
});

pool.getConnection((err, connection) =>{
    if(err) throw err // 연결 X
    console.log("DB 연결 성공");

});



app.get('', (req, res) => {
    res.render('index');


    pool.getConnection((err, connection) =>{
        if(err) throw err // 연결 X
        console.log("DB 연결 성공");
        
        connection.query('SELECT * FROM user WHERE id ="1"', (err, rows)=>{
            // once done, release connection
            connection.release();

            if(!err){
                res.render('index');
            }
        });
    });
    

});

app.post('', (req, res) => {

    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length == 0) {
        return res.status(400).send("파일이 업로드 되지 않았습니다.");
    }

    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '/upload/' + sampleFile.name;

    console.log(sampleFile);

    sampleFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);


        res.send("파일 업로드!");

    }
    );



})


app.listen(port, () => console.log(`${port} 서버 포트가 실행 중입니다.`));