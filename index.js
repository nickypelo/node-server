const http = require("http");
const fs = require('fs');
const url = require('url');


const host = 'localhost';
const port = 8080;

const pageError = fs.readFileSync('./404.html', 'utf-8', (err,data)=>{
    if(err) throw err;
    return data;
});


const server = http.createServer((req,res)=>{
    const q = url.parse(req.url, true);
    let filename = "";

    if (req.url === "/") {
      filename = "." + "/index.html";
    } else {
      filename = "." + q.pathname;
    }
    

    fs.readFile(filename, (err, data)=>{
        if(err){
            res.writeHead(404,{'Content-Type':'text/html'});
            res.write(pageError);
            return res.end();
        }
        else{
            res.writeHead(200,{'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        }
    })

})

server.listen(port, host, ()=>{
    console.log(`Server running at http://${host}:${port}/`)
})