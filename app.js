const express = require("express");
const exphbs = require("express-handlebars");
const fileupload = require("express-fileupload");
const mysql = require("mysql");

const app = express();
const port = process.env.PORT || 5000;


app.use(fileupload());

//static files
app.use(express.static('public'))
app.use(express.static('upload'))

const handlebars = exphbs.create({ extname: '.hbs',});
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

//connection pool
var connection = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '123123r',
    database: 'userprofile',
});


app.get('', (req, res) => {
    connection.query('SELECT * FROM user WHERE id = "1"', (err, rows) => {
      if (!err) {
        res.render('index', { rows });
      }
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

        connection.query('UPDATE user SET profile_image = ? WHERE id ="1"', [sampleFile.name], (err, rows) => {
        if (!err) {
          res.redirect('/');
        } else {
          console.log(err);
        }
      });
    }
    );



})


app.listen(port, () => console.log(`${port} 서버 포트가 실행 중입니다.`));