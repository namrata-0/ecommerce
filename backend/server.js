var express = require('express');
var app = express();
const indexRouter = require("./Router/indexRouter")
const cors = require('cors');
app.use(cors());

app.use("/", indexRouter)

app.listen(8000, function(req,res){
    console.log("port is running at 8000")
})