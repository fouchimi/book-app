const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path')
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults();
const fs = require('fs');

server.use(middlewares);

server.get('/echo', (req, res) => {
    res.jsonp(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use('/bookshelves', (req, res, next) => {
    if (req.method === 'POST') {
        var obj = {
            'bookshelves': []
        };
        console.log(req.body);
        obj.bookshelves.push(req.body);
        const jsonObj = JSON.stringify(obj);
        console.log('Updating db.json');
        fs.writeFile('db.json', jsonObj, 'utf8', function(err){
            if(err){
                console.error(err);
                return res.status(500).json(err);
            }
            console.log('Updated db.json');
            res.send();
        });
    }
    // Continue to JSON Server router
    next()
})

server.use(router);
server.listen(3000, () => {
    console.log('JSON Server is running...')
});