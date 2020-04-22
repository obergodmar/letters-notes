const staticServer = require('node-static');
const file = new staticServer.Server('./dist');

require('http').createServer( (request, response) =>
    request
        .addListener('end',  () => file.serve(request, response))
        .resume()
).listen(process.env.PORT);
