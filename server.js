var express = require('express');
var app = express();
 var request=require('request');
 var cors = require('cors');
const path = require("path");
app.use(cors())

app.get('/data', function (req, res) {
  

request('http://interview.wpengine.io/v1/accounts', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body); // Print the google web page.
res.send(body);
  }
});
})



 app.use(express.static("build"));
 app.use(express.static("public"));

app.use((req, res, next) => {
  res.sendfile(path.join("build", "index.html"));
});

const PORT = process.env.PORT || 8081;
var server = app.listen(PORT, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})