const express = require('express');
const expressMongoDb = require('express-mongo-db');
const bodyParser = require('body-parser');

const app = express();

app.use(expressMongoDb('mongodb://localhost/surf-app-back'));
app.use(bodyParser.json());

app.get('/praia', (req, res) => {
    req.db.collection('praias')
    .find({})
    .toArray((err, data) => {
        res.send(data);
    });
});

app.post('/praia', (req, res) => {
    console.log(req.body);

    let praia = {
        pais: req.body.pais,
        local: req.body.local,
        video: req.body.video,
        info: req.body.info,
        coordenadas: req.body.coordenadas
    }

    req.db.collection('praias')
    .insert(praia, (err, data) => {
        res.send(data);
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na 3000'); 
});