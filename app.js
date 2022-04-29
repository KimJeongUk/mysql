const express = require("express");
const exphbs = require("exphbs");
const fileupload = require("express-fileupload");

const app = express();
const port = process.env.PORT || 5000;


app.use(fileupload());

app.engine('hbs', require('exphbs'));
app.set('view engine', 'hbs');

app.get('', (req,res)=>{
    res.render('index');
})

app.post('', (req,res)=>{
    
let sampleFile;
let uploadPath;

if(!req.files || Object.keys(req.files).length == 0)
{
    return res.status(400).send("파일이 업로드 되지 않았습니다.");
}

sampleFile = req.files.sampleFile;
console.log(sampleFile);





})


app.listen(port, ()=> console.log(`${port} 서버 포트가 실행 중입니다.`));