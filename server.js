import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { MongoClient, ObjectId} from 'mongodb';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

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

    const { product, token } = req.body;

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Verified payload:', verified);

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

app.post('/api/register', async (req, res) => {
    const {username, password, email} = req.body;

    try { 
        const db = client.db();
        let user = await db.collection('users').findOne({Email: email});
        if(user)
        {
            return res.status(400).json({error: 'Email already registered'});
        }

        user = {username, password};

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const payload = {
            user: {
                id: user._id
            }
        };

        await db.collection('users').insertOne({Username: username, Password: hash});
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600}, 
            (err, token) => {
                if(err) throw err;
                res.status(200).json({token: token, error: ''});
            }
        );
    }
    catch(err) {
        console.log(err.toString());
        res.status(500).json({error: 'Server error'});
    }
});

app.post('/api/login', async (req, res) => {
    const {username, password} = req.body;
    try {
        const db = client.db();
        let user = await db.collection('users').findOne({Username: username});
        if(!user) {
            console.log("invalid username.");
            return res.status(400).json({error: "Invalid username or password."});
        }

        const isMatch = await bcrypt.compare(password, user.Password);
        if(!isMatch) {
            console.log("invalid password");
            return res.status(400).json({error: "Invalid username or password."});
        }

        const payload = {
            user: {
                id: user._id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600}, 
            (err, token) => {
                if(err) throw err;
                res.status(200).json({token: token, error: ''});
            }
        );
    }
    catch(e) {
        console.log(e.toString());
        res.status(500).json({error: "Server Error"});
    }
});

app.listen(5000);