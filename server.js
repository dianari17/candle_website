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
//
// Solved by making seperate accounts for admins and customers
// Need to eventually update existing API to handle the seperate accounts
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
    var error = '';

    const { search } = req.body;
    var _search = search.trim();

    const db = client.db();
    const rawResults = await db.collection('products').find({ "Product": { $regex: _search + '.*' } }).toArray();

    // var results = [];
    // for (var i = 0; i < rawResults.length; i++) {
    //     results.push({ID: rawResults[i]._id, Product: rawResults[i].Product});
    // }

    var ret = { results: rawResults, error: error };
    res.status(200).json(ret);
});

// ------------------------------------------------ semi danger zone -----------------
// Need a way to verify a user is who they say they are

// TODO: Swap UserID string field for _id
app.post('/api/addToCart', async (req, res, next) => {
    var error = '';

    const { userId, productId, amount } = req.body;

    const db = client.db();

    // In future, use product's id
    const productObj = await db.collection('products').findOne({ _id: ObjectId.createFromHexString(productId)});

    if(!productObj)
    {
        error = 'Product not found.';
    }
    else
    {
        db.collection('users').updateOne(
            {"UserID": { $regex: userId + '.*'}},                        // User to update
            { $push: { "Cart": { id: productObj._id, amount: amount } }}    // Add to cart
        );
    }
    res.status(200).json({error: error});
});

app.post('/api/removeFromCart', async (req, res, next) => {
    var error = '';
    const { userId, productId } = req.body;

    try {
        const db = client.db();
    
        db.collection('users').updateOne(
            { "UserID": { $regex: userId + '.*'}},
            { $pull: { "Cart": {id: ObjectId.createFromHexString(productId) }}}
        );
    }
    catch(e) {
        error = e.toString();
    }
    
    res.status(200).json({error: error})
});

// TODO: Swap UserID string field for _id
app.post('/api/getCart', async (req, res, next) => {
    var error = '';
    var products = [];
    const { userId } = req.body;

    try{
        const db = client.db();
        const user = await db.collection('users').findOne({"UserID": userId});
        const cart = user.Cart;

        const ids = cart.map(item => item.id);
        products = await db.collection('products').find({_id: { $in: ids }}).toArray();
    }
    catch(e){
        error = e.toString();
        console.log(error);
    }
    res.status(200).json({products: products, error: error});
});


// -----------------------------------------------------------------------------

//Account related API
//Very WIP

/*
//Admins can manage products

app.post('/api/adminAccountCreate', async (req, res, next) => {
    //incoming: login, password, firstName, lastName
    //outgoing: error

    var error = '';
    const {login, password, firstName, lastName} = req.body;
    const newAdmin = {Login:login , Password:password, FirstName:firstName, LastName:lastName, AdminID:adminID}; 
    //I don't know how to do the incremental IDs with mongoDB

    try {
        const db = client.db();
        db.collection('Admins').insertOne(newAdmin);
    }
    catch(e) {
        error = e.toString();
    }
}


//Normal users use the shopping cart, can not manage products

app.post('/api/userAccountCreate', async (req, res, next) => {
    //incoming: login, password, firstName, lastName
    //outgoing: error

    var error = '';
    const {login, password, firstName, lastName} = req.body;
    const newUser = {Login:login , Password:password, FirstName:firstName, LastName:lastName, UserID:userID}; 
    //I don't know how to do the incremental IDs with mongoDB

    try {
        const db = client.db();
        db.collection('Users').insertOne(newUser);
    }
    catch(e) {
        error = e.toString();
    }
}
*/

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