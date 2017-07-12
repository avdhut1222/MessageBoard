var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var messages = [{text: 'Some text', owner: 'Tim'}, {text: 'Other text', owner: 'Cook'}];

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var api = express.Router();

api.get('/messages', (req, res) => {
    res.json(messages);
});

api.get('/messages/:user', (req, res) => {
    var user = req.params.user;
    var result = messages.filter(messages => messages.owner == user);
    res.json(result);
});

api.post('/messages', (req, res) => {
    console.log(req.body);
    messages.push(req.body);
    // res.sendStatus(200);
    res.json(req.body);
});

app.use('/api', api);

app.listen(9001);