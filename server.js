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

// Returns true if the token specifies an admin user
async function isAdmin(token) {
    try {
        const adminId = jwt.verify(token, process.env.JWT_SECRET).user.id;
        let db = client.db();
        let admin = await db.collection('users').findOne({_id: ObjectId.createFromHexString(adminId)});
        return admin != null && admin.Role == 'admin';
    }
    catch(e) {
        console.log(e.toString());
        return false;
    }
}
function getID(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET).user.id;
    }
    catch {
        return false;
    }
}

app.post('/api/addProduct', async (req, res, next) => {

    const { product, token } = req.body;

    // Verify permissions. Only an admin should be able to edit product list
    if(await isAdmin(token) == false) {
        return res.status(403).json({error: 'Insufficient permissions.'});
    }

    const newProduct = { Product: product };
    var error = '';
    try {
        // Add product
        const db = client.db();
        await db.collection('products').insertOne(newProduct);
    }
    catch(e) {
        // Something went wrong
        error = e.toString();
        console.log(error);
    }
    var ret = {error: error};
    res.status(200).json(ret);
});

app.post('/api/deleteProduct', async (req, res, next) => {
    const { productId, token } = req.body;

    // Verify permissions. Only an admin should be able to edit product list
    if(await isAdmin(token) == false) {
        return res.status(403).json({error: 'Insufficient permissions.'});
    }

    let response = '';
    try {
        // Delete product
        const db = client.db();
        response = await db.collection('products').deleteOne({_id: ObjectId.createFromHexString(productId)});
    }
    catch(e) {
        // Something went wrong
        response = e.toString();
        console.log(e);
    }
    res.status(200).json({response: response, error: ''});
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


app.post('/api/addToCart', async (req, res, next) => {
    var error = '';

    const { productId, amount, token } = req.body;

    // Ensure the sender is allowed to edit the cart
    const userId = getID(token);
    if(!userId) {
        res.status(200).json({error: "Invalid token." });
        return;
    }
    const db = client.db();

    // Get the product to add
    const productObj = await db.collection('products').findOne({ _id: ObjectId.createFromHexString(productId)});

    if(!productObj)
    {
        error = 'Product not found.';
    }
    else
    {
        // Add the product to the cart
        db.collection('users').updateOne(
            {_id: ObjectId.createFromHexString(userId)},                    // User to update
            { $push: { "Cart": { id: productObj._id, amount: amount } }}    // Add to cart
        );
    }
    res.status(200).json({error: error});
});

app.post('/api/updateCartAmount', async(req, res, next) => {
    var error = '';
    const { productId, amount, token } = req.body;

    // Ensure the sender is allowed to edit the cart
    const userId = getID(token);
    if(!userId) {
        res.status(200).json({error: "Invalid token." });
        return;
    }

    try {
        const db = client.db();
        
        // Modify cart amount
        let response = await db.collection('users').updateOne(
            {_id: ObjectId.createFromHexString(userId), "Cart.id": ObjectId.createFromHexString(productId)}, 
            {$set: { "Cart.$.amount": amount }
        });
    }
    catch(e) {
        error = e.toString();        
    }
    res.status(200).json({error: error});
});

app.post('/api/removeFromCart', async (req, res, next) => {
    var error = '';
    const { productId, token } = req.body;

    // Ensure the sender is allowed to edit the cart
    const userId = getID(token);
    if(!userId) {
        res.status(200).json({error: "Invalid token." });
        return;
    }

    try {
        const db = client.db();
    
        // Remove from cart
        db.collection('users').updateOne(
            { _id: ObjectId.createFromHexString(userId)},
            { $pull: { "Cart": {id: ObjectId.createFromHexString(productId) }}}
        );
    }
    catch(e) {
        error = e.toString();
    }
    
    res.status(200).json({error: error})
});

app.post('/api/getCart', async (req, res, next) => {
    var error = '';
    var products = [];
    const { token } = req.body;

    // Ensure the sender is allowed to view the cart
    const userId = getID(token);
    if(!userId) {
        res.status(200).json({error: "Invalid token."});
        return;
    }

    try{
        // Get user's cart
        const db = client.db();
        const user = await db.collection('users').findOne({_id: ObjectId.createFromHexString(userId)});
        if(!user) {
            res.status(200).json({error: "Invalid user."});
            return;
        }
        const cart = user.Cart;

        // Find the items in the cart
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
    const {firstname, lastname, password, email} = req.body;

    try { 
        // Ensure user doesn't already exist
        const db = client.db();
        let user = await db.collection('users').findOne({Email: email});
        if(user)
        {
            return res.status(400).json({error: 'Email already registered'});
        }

        // Hash password to store in database
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Add to database
        user = await db.collection('users').insertOne({FirstName: firstname, Cart: [], LastName: lastname, Email: email, Password: hash, Role: 'user'});
        const payload = {
            user: {
                id: user._id
            }
        };

        // Return token so user can authenticate later
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

app.post('/api/registerAdmin', async (req, res) => {
    const {firstname, lastname, password, email, token} = req.body;

    try { 
        const db = client.db();

        // Check for permissions. Only an admin can create other admins
        if(await isAdmin(token) == false) {
            return res.status(403).json({error: 'Insufficient permissions.'});
        }

        // Ensure user doesn't already exist
        let user = await db.collection('users').findOne({Email: email});
        if(user)
        {
            return res.status(400).json({error: 'Email already registered'});
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Create new user
        await db.collection('users').insertOne(
            {FirstName: firstname, LastName: lastname, Email: email, 
            Password: hash, Cart: [], Role: 'admin'});
    }
    catch(err) {
        console.log(err.toString());
        res.status(500).json({error: 'Server error'});
    }
});


app.post('/api/login', async (req, res) => {
    const {email, password} = req.body;
    try {
        const db = client.db();

        // Check if that user exists
        let user = await db.collection('users').findOne({Email: email});
        if(!user) {
            console.log("invalid username.");
            return res.status(400).json({error: "Invalid username or password."});
        }

        // Check if the hash matches
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

        // Send token so user can authenticate later
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