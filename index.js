const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const ObjectId =require('mongodb').ObjectID;
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()


const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.y1wap.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const inputCollection = client.db("FormDatabase").collection("FormValu");
    
    app.get('/allList',(req,res)=>{
        inputCollection.find()
        .toArray((err,items)=>{
            res.send(items);
        })
    })

    app.post('/addForm', (req, res) => {
        const newBook = req.body;
        inputCollection.insertOne(newBook)
            .then(result => {
                console.log('insurt', result.insertedCount > 0)
                res.send(result.insertedCount > 0)
            })

    })

    // app.delete('/delete/:id',(req,res)=>{
    //     productCollection.deleteOne({_id: ObjectId(req.params.id)})
    //     .then(result=>{
    //        res.send(result.deletedCount>0);
    //     })
    // })

   

});




app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})