import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { MongoClient, ObjectId} from 'mongodb';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import multer from 'multer';

dotenv.config();
const app = express();

const{
    DOMAINS,
    PAYPAL_API_BASE_URL = "https://api-m.sandbox.paypal.com", // use https://api-m.paypal.com for production environment
    PAYPAL_SDK_BASE_URL = "https://www.sandbox.paypal.com", // use https://www.paypal.com for production environment
    PAYPAL_CLIENT_ID,
    PAYPAL_CLIENT_SECRET,
    MONGODB_URI,
} = process.env;


//const MONGODB_URI = process.env.MONGODB_URI;
const client = new MongoClient(MONGODB_URI);
client.connect();

const upload = multer({ storage: multer.memoryStorage() });

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


function getPayPalSdkUrl() {
    const sdkUrl = new URL("/sdk/js", PAYPAL_SDK_BASE_URL);
    const sdkParams = new URLSearchParams({
        "client-id": PAYPAL_CLIENT_ID,
        components: "buttons,fastlane",
    });
    sdkUrl.search = sdkParams.toString();

    return sdkUrl.toString();
}

//generate paypal's client token
async function getClientToken() {
    try {
        if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
            throw new Error("Missing API credentials");
        }

        const url = `${PAYPAL_API_BASE_URL}/v1/oauth2/token`;

        const headers = new Headers();
        const auth = Buffer.from(
            `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`
        ).toString("base64");
        headers.append("Authorization", `Basic ${auth}`);
        headers.append("Content-Type", "application/x-www-form-urlencoded");

        const searchParams = new URLSearchParams();
        searchParams.append("grant_type", "client_credentials");
        searchParams.append("response_type", "client_token");
        searchParams.append("intent", "sdk_init");
        searchParams.append("domains[]", DOMAINS);

        const options = {
            method: "POST",
            headers,
            body: searchParams,
        };

        const response = await fetch(url, options);
        const data = await response.json();

        return data.access_token;
    } catch (error) {
        console.error(error);
        return "";
    }
} 

async function renderCheckout(req, res) {
    const sdkUrl = getPayPalSdkUrl();
    const clientToken = await getClientToken();
    const locals = {
        title: "Fastlane - PayPal Integration Quick Start",
        prerequisiteScripts: `
        <script
          src="${sdkUrl}"
          data-sdk-client-token="${clientToken}"
          defer
        ></script>
      `,
        initScriptPath: "app.js",
        stylesheetPath: "./styles.css",
    };

    res.render("checkout", locals);
}

async function getAccessToken() {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
        throw new Error("Missing API credentials");
    }

    const url = `${PAYPAL_API_BASE_URL}/v1/oauth2/token`;

    const headers = new Headers();
    const auth = Buffer.from(
        `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`
    ).toString("base64");
    headers.append("Authorization", `Basic ${auth}`);
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    const searchParams = new URLSearchParams();
    searchParams.append("grant_type", "client_credentials");

    const options = {
        method: "POST",
        headers,
        body: searchParams,
    };

    const response = await fetch(url, options);
    const data = await response.json();

    return data.access_token;
}

//create and confirm order
export async function createOrder(req, res) {
    try {
        const { paymentToken, shippingAddress } = req.body;

        const url = `${PAYPAL_API_BASE_URL}/v2/checkout/orders`;

        const headers = new Headers();
        const accessToken = await getAccessToken();
        headers.append("PayPal-Request-Id", Date.now().toString());
        headers.append("Authorization", `Bearer ${accessToken}`);
        headers.append("Content-Type", "application/json");

        const { fullName } = shippingAddress?.name ?? {};
        const { countryCode, nationalNumber } =
            shippingAddress?.phoneNumber ?? {};

        const payload = {
            intent: "CAPTURE",
            payment_source: {
                card: {
                    single_use_token: paymentToken.id,
                },
            },
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: "100",
                    },
                    ...(shippingAddress && {
                        shipping: {
                            type: "SHIPPING",
                            ...(fullName && {
                                name: {
                                    full_name: fullName,
                                },
                            }),
                            address: {
                                address_line_1:
                                    shippingAddress.address.addressLine1,
                                address_line_2:
                                    shippingAddress.address.addressLine2,
                                admin_area_2:
                                    shippingAddress.address.adminArea2,
                                admin_area_1:
                                    shippingAddress.address.adminArea1,
                                postal_code: shippingAddress.address.postalCode,
                                country_code:
                                    shippingAddress.address.countryCode,
                            },
                            ...(countryCode &&
                                nationalNumber && {
                                    phone_number: {
                                        country_code: countryCode,
                                        national_number: nationalNumber,
                                    },
                                }),
                        },
                    }),
                },
            ],
        }; 
        const response = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(payload),
        });
        const result = await response.json();

        res.status(response.status).json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
} 

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
    catch(e) {
        return false;
    }
}

app.post('/api/addProduct', upload.single('productImage'), async (req, res, next) => {

    const { product, description, price, token, ingredients, weight } = req.body;

    console.log("Uploaded file:", req.file);
    console.log("Buffer: ", req.file.buffer);

    // Verify permissions. Only an admin should be able to edit product list
    if(await isAdmin(token) == false) {
        return res.status(403).json({error: 'Insufficient permissions.'});
    }
    if(!req.file) {
        return res.status(400).json({error: 'Product image is required.'});
    }

    const newProduct = 
    { 
        Product: product, 
        Description: description, 
        Price: Number(price),
        Image: { data: Buffer.from(req.file.buffer), contentType: req.file.mimetype, },
        Ingredients: ingredients,
        Weight: Number(weight),
    };
    var error = '';
    try {
        // Add product
        const db = client.db();
        await db.collection('products').insertOne(newProduct);
    }
    catch(e) {
        // Something went wrong
        error = e.toString();
        console.error("Error adding product: " + error);
    }
    var ret = {error: error};
    res.status(200).json(ret);
});

app.get('/api/productImage/:id', async (req, res) => {
    const {id} = req.params;
    const db = client.db();
    try {
        const product = await db.collection('products').findOne({_id: ObjectId.createFromHexString(id)});
        if(!product || !product.Image) {
            console.error("No image found for id.");
            return res.status(404).json({error: 'Image not found'});
        }
        res.set('Content-Type', product.Image.contentType);
        res.status(200).json({contentType: product.Image.contentType, data: product.Image.data.toString('base64')});
    }
    catch (e) {
        console.error("Error fetching image: " + e);
        res.status(500).json({ error: e.toString() });
    }
})

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

app.post('/api/searchProducts', async (req, res, next) => {
    var error = '';
    var products = [];
    var numPages = 0;
    try {
        const { searchInput, productsPerPage, pageNum } = req.body;

        const limit = parseInt(productsPerPage) || 10; // Default limit of 10 products per page
        const page = parseInt(pageNum) || 1; // Default limit of first page.
        const skip = (page - 1) * limit;
    
        var search = searchInput.trim();
    
        const db = client.db();
        products = await db.collection('products').find({ "Product": { $regex: new RegExp('.*' + search + '.*', 'i')} }).skip(skip).limit(limit).toArray();
        const totalCount = await db.collection('products').countDocuments({ "Product": { $regex: search + '.*' } });

        numPages = Math.ceil(totalCount / productsPerPage);
    }
    catch(e) {
        error = e.toString();
        console.error(e);
    }
    var ret = { products: products, numPages: numPages, error: error };
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

    const cartProduct = await db.collection('users').findOne({
        _id: ObjectId.createFromHexString(userId), 
        "Cart.id": ObjectId.createFromHexString(productId)
    },
    {
        projection: {
            Cart: {$elemMatch: { id: ObjectId.createFromHexString(productId) } }
        }
    });

    // Cart product already exists, so just increment the amount in the cart 
    // instead of adding new item
    if(cartProduct) {
        const amount = cartProduct.Cart[0].amount + 1;
        let response = await db.collection('users').updateOne(
            {_id: ObjectId.createFromHexString(userId), "Cart.id": ObjectId.createFromHexString(productId)}, 
            {$set: { "Cart.$.amount": amount }
        });
        res.status(200).json({error: error});
        return;
    }

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

    // Ensure only the sender is allowed to edit the cart
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

    // Ensure only the sender is allowed to edit the cart
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
    var amounts = [];
    const { token } = req.body;

    // Ensure only the sender is allowed to view the cart
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

        amounts = cart.map(item => item.amount);
        // Find the items in the cart
        const ids = cart.map(item => item.id);
        products = await db.collection('products').find({_id: { $in: ids }}).toArray();
    }
    catch(e){
        error = e.toString();
        console.log(error);
    }
    res.status(200).json({products: products, amounts: amounts, error: error});
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
                id: user.insertedId
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
                res.status(200).json({token: token, role: user.Role, error: ''});
            }
        );
    }
    catch(e) {
        console.log(e.toString());
        res.status(500).json({error: "Server Error"});
    }
});

app.post('/api/submitFeedback', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const db = client.db();
        await db.collection('feedback').insertOne({ name, email, message, createdAt: new Date() });
        res.status(200).json({ message: 'Feedback submitted successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.toString() });
    }
});




app.listen(5000);
