import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { MongoClient, ObjectId} from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
const app = express();


const MONGODB_URI = process.env.MONGODB_URI;
const client = new MongoClient(MONGODB_URI);
client.connect();


app.use(cors());
app.use(express.json());

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

// ----------------- danger zone --------------------------------------------------------------------
// We need to figure out some way to make sure only validated users
// can add or delete products. Everyday users should NOT have access to these
app.post('/api/addProduct', async (req, res, next) => {

    const { product } = req.body;
    const newProduct = { Product: product };
    var error = '';
    try {
        const db = client.db();
        await db.collection('products').insertOne(newProduct);
    }
    catch(e) {
        error = e.toString();
        console.log(error);
    }
    var ret = {error: error};
    res.status(200).json(ret);
});

app.post('/api/deleteProduct', async (req, res, next) => {
    const { productId } = req.body;
    console.log("Attempting to delete item with id " + productId);
    let response = '';
    try {
        const db = client.db();
        response = await db.collection('products').deleteOne({_id: ObjectId.createFromHexString(productId)});
    }
    catch(e) {
        response = e.toString();
        console.log(e);
    }
    res.status(200).json({response: response});
});

// ----------------------------------------------------------------------------------------------------

app.post('/api/searchProducts', async (req, res, next) => {
    // incoming: userId, search
    // outgoing: results[], error
    var error = '';

    const { search } = req.body;
    var _search = search.trim();

    const db = client.db();
    const rawResults = await db.collection('products').find({ "Product": { $regex: _search + '.*' } }).toArray();

    var results = [];
    for (var i = 0; i < rawResults.length; i++) {
        results.push({ID: rawResults[i]._id, Product: rawResults[i].Product});
    }

    var ret = { results: results, error: error };
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