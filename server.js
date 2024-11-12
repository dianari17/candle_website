const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(MONGODB_URI);
client.connect();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

app.post('/api/addProduct', async (req, res, next) => {

    const { product } = req.body;
    const newProduct = { Product: product };
    var error = '';
    try {
        const db = client.db();
        const result = db.collection('products').insertOne(newProduct);
    }
    catch(e)
    {
        error = e.toString();
        console.log(error);
    }
    var ret = {error: error};
    res.status(200).json(ret);
});

app.post('/api/searchProducts', async (req, res, next) => {
    // incoming: userId, search
    // outgoing: results[], error
    var error = '';
    const { search } = req.body;
    var _search = search.trim();
    const db = client.db();
    const results = await db.collection('products').find({ "Product": { $regex: _search + '.*' } }).toArray();
    var _ret = [];
    for (var i = 0; i < results.length; i++) {
        _ret.push({ID: results[i]._id, Product: results[i].Product});
    }
    var ret = { results: _ret, error: error };
    res.status(200).json(ret);
});

// TODO: Uses product name for testing. In the future, use object ID instead
app.post('/api/addToCart', async (req, res, next) => {
    var error = '';

    const { userId, productId, amount } = req.body;

    const db = client.db();

    // In future, use product's id
    const productObj = await db.collection('products').findOne({ "Product": { $regex: productId + '.*' }});

    console.log(productObj);
    if(!productObj)
    {
        error = 'Product not found.';
    }
    else
    {
        db.collection('users').updateOne(
            {"FirstName": { $regex: userId + '.*'}},                        // User to update
            { $push: { "Cart": { id: productObj._id, amount: amount } }}    // Add to cart
        );
    }
    res.status(200).json({error: error});
});


// app.post('/api/login', async (req, res, next) => {
//     // incoming: login, password
//     // outgoing: id, firstName, lastName, error
//     var error = '';
//     const { login, password } = req.body;

//     console.log("Received " + login + " and " + password);
//     const db = client.db();
//     const test = await db.collection('users').countDocuments();
//     console.log(test);
//     const results = await db.collection('users').find({ Login: login, Password: password }).toArray();
//     var id = -1;
//     var fn = '';
//     var ln = '';
//     console.log("Received " + results.length + " results");
//     if (results.length > 0) {
//         id = results[0].UserId;
//         fn = results[0].FirstName;
//         ln = results[0].LastName;
//     }
//     var ret = { id: id, firstName: fn, lastName: ln, error: '' };
//     res.status(200).json(ret);
// });



app.listen(5000);