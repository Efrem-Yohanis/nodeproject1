var http = require('http');

var app = http.createServer(function(req,res){
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ name: 'Efrem',id:123 }));
});
app.listen(4000);