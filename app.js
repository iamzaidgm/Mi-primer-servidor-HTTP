const http = require('http');
const fs = require('fs');


// http => (request, response)

http.createServer((request,response)=>{

    const file = request.url == '/' ? 
    './WWW/index.html' : `./WWW${request.url}.html`;

    if(request.url == '/login'){
      let data = [];
      request.on("data", value => {
        data.push(value);
      }).on("end", ()=>{
        let params = Buffer.concat(data).toString();
        console.log(params);
        response.write(params);
        response.end();
      });
    }

    //const data = fs.readFileSync('./WWW/index.html');
    fs.readFile(file, (err, data) => {
     if(err){
       response.writeHead(404, {"Content-Type":"text/html"});
       response.write("Not found");
       response.end();
     }else{
     const extension = request.url.split('.').pop();
     console.log(extension);
     switch (extension){
      case 'txt':
        response.writeHead(200, {"Content-Type":"text/html"});
        break;
      case 'html':
        response.writeHead(200, {"Content-Type":"text/html"});
        break;
      case 'css':
        response.writeHead(200, {"Content-Type":"text/css"});
        break;
      case 'ico':
        response.writeHead(200, {"Content-Type":"image/x-icon"});
        break;
      case 'js':
        response.writeHead(200, {"Content-Type":"text/javascript"});
        break;
      case 'jpeg':
        response.writeHead(200, {"Content-Type":"/image/jpeg"});
        break;
     default:
     }
     response.write(data);
     response.end();
     }
    });
}).listen(4444); 