const express = require("express");
const ejs = require("ejs");
const app = express();
const port = 3000;
var bodyParser = require("body-parser");
const mysql = require("mysql2");

app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: false }));

// app.get("/images", express.static("images"));
// app.use(express.static("images"));
app.use("/images", express.static(__dirname + "/images"));

const connecection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "0000",
  database: "make_web",
});

app.get("/", (req, res) => {
  res.render("index"); // ./views/index.ejs
});

app.get("/qualification", (req, res) => {
  res.render("qualification");
});

app.get("/project", (req, res) => {
  res.render("project");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/engineer", (req, res) => {
  res.render("engineer");
});

app.post("/contactProc", (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  const memo = req.body.memo;

  var sql =
    "insert into make_web.contact(name,phone,email,memo,regdate) values( ?, ?, ?, ?, now() )";
  var values = [name, phone, email, memo];

  connecection.query(sql, values, function (err, result) {
    if (err) throw err;
    console.log("자료 1개가 삽입되었습니다. ", values);
    res.send(
      "<script> alert('문의사항이 등록되었습니다.'); location.href='/'; </script>"
    );
  });

  // var a = "{$name} ${phone} ${email} ${memo}";
  // res.send(a);
});

app.get("/test", (req, res) => {
  res.send("<h1>test</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
