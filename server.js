const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const app = express();
var listaPedidos = [];
var db = {};

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser());
app.use(cors());
app.set('view engine', 'ejs');
            
 const uri = 'mongodb+srv://marcus:te5skyrim@cluster0-clc5q.mongodb.net/test?retryWrites=true&w=majority';
var ObjectId = require('mongodb').ObjectID;
// const client = MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
// MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
//     if (err)
//         console.log(err);
//     db = client.db('crud-nodejs');
//     app.listen(3000, function () {
//         console.log("server running on port 3000");
//     });
// })
const client = MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect((err, client) => {
    if(err)
        console.log("deu eroo!!!!: " + err);
  db = client.db("crud-nodejs");
  // perform actions on the collection object
  app.listen(3000, function () {
    console.log("server running on port 3000");
   });
  //client.close();
});


app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/', (req, res) =>{
    var cursor = db.collection('data').find();
});

app.get('/show', (req, res) => {
    db.collection('data').find().toArray((err, results) => {
        if(err) 
            return console.log(err);
        res.render('show.ejs', { data: results });
    })
});
app.post('/show', (req, res) => {
    db.collection('data').insertOne(req.body, (err, result) => {
        if (err)
            return console.log(err);

        console.log('salvo no banco de dados');
        res.redirect('/show');
    })
})

app.route('/edit/:id').get((req, res) => {
    var id = req.params.id;
    

    db.collection('data').find(ObjectId(id)).toArray((err, result) => {
        if(err)
            return res.send(err);
            console.log(result);
        res.render('edit.ejs', { data: result });
    })
})
.post((req, res) => {
    var id = req.params.id;
    var name = req.body.name;
    var surname = req.body.surname;
    

    db.collection('data').updateOne({ _id: ObjectId(id)}, {
        $set: {
            name: name,
            surname: surname
        }
    }, (err, result) => {
        if(err)
            return res.send(err);
        res.redirect('/show');
        console.log('Atualizado no Banco de dados');
    })
})

app.route('/delete/:id').get((req, res) => {
    var id = req.params.id;

    db.collection('data').deleteOne({_id: ObjectId(id)}, (err, result) => {
        if (err)
            return res.send(500, err);
        console.log('Deletado do Banco de DAdos');
        res.redirect('/show');
    })
})

app.get('/list', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    var result = {};
    db.collection('data').find().toArray((err, results) => {
        if(err) 
            return console.log(err);
            
            res.send(JSON.stringify(results));
    });
})

app.post('/salvaPedido', (req, res) => {
    var result = req.body;
    listaPedidos.push(result);
    console.log(result);
    res.send(listaPedidos);
})

app.post('/salvaConta', (req, res) => {
    db.collection('contasapagar').insertOne(req.body, (err, result) => {
        if (err)
            return console.log(err);

        console.log('salvo no banco de dados');
        res.send(200);
    })
})
app.get('/listContasAPagar', (req, res) => {
    db.collection('contasapagar').find().toArray((err, result) => {
        if (err)
            return console.log(err);
        res.send(result);
    })
})

app.get('/getContaAPagar/:id', (req, res) => {
    db.collection('contasapagar').findOne({ _id: ObjectId(req.params.id) }, function(err, document) {
        if(err)
            console.log(err);
        res.send(document);
    })
})

app.put('/putContaAPagar/:id', (req, res) => {
    db.collection('contasapagar').replaceOne({ _id: ObjectId(req.params.id) },
    { conta: req.body.conta }
    )
    res.send("ts");
})

app.delete('/deleteContaAPagar/:id', (req, res) => {
    db.collection('contasapagar').deleteOne({ _id: ObjectId(req.params.id) }, 
    {},
    (err, doc) => {
        if(err)
            res.send(err);
        res.send(200);
    })
})