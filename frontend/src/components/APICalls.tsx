import {IProduct} from './IProduct'

const server = 'http://localhost:5000/api/'

// TODO: Use IProduct for this
export async function addProduct(product : string, description: string, price : string, weight : string, ingredients : string, image: File) : Promise<string> {
    // Use form data to handle image transfer
    const formData = new FormData();
    
    formData.append('product', product);
    formData.append('description', description);
    formData.append('productImage', image);
    formData.append('price', price);
    formData.append('weight', weight);
    formData.append('ingredients', ingredients);
    formData.append('token', localStorage.getItem('token') || '');

    try {
        const response = await
            fetch(server + 'addProduct', {
                    method: 'POST', body: formData,
                });
        let txt = await response.text();
        let res = JSON.parse(txt);
        if (res.error.length > 0) {
            return "API Error: " + res.error;
        }
        else {
            return "Product has been added";
        }
    }
    catch (error: any) {
        return error.toString();
    }
};

export async function deleteProduct(productId: string) : Promise<string> {
    let payload = JSON.stringify({ productId: productId, token: localStorage.getItem('token') });
    console.log(localStorage.getItem('token'));
    try {
        const response = await
            fetch(server + 'deleteProduct', {
                method: 'POST', body: payload, headers: {
                    'Content-Type': 'application/json'
                }
            });
        let res = JSON.parse(await response.text());
        if(res.error.length > 0) {
            return "API Error: " + res.error;
        }
        else {
            return res.response;
        }
    }
    catch(error: any) {
        return "Local error: " + error.toString();
    }

};

export async function addToCart(productId: string, amount: number): Promise<string> {

    let payload = JSON.stringify({ productId: productId, amount: amount, token: localStorage.getItem('token') });

    try {
        const response = await
            fetch(server + 'addToCart',
                {
                    method: 'POST', body: payload, headers: {
                        'Content-Type':
                            'application/json'
                    }
                });
        let txt = await response.text();
        let res = JSON.parse(txt);
        if (res.error.length > 0) {
            return "API Error: " + res.error;
        }
        else {
            return "Product has been added";
        }
    }
    catch (error: any) {
        return error.toString();
    }
};

export async function updateCartAmount(productId: string, amount: number) : Promise<string> {
    let payload = JSON.stringify({ productId: productId, amount: amount, token: localStorage.getItem('token') });

    try {
        const response = await
            fetch(server + 'updateCartAmount',
                {
                    method: 'POST', body: payload, headers: {
                        'Content-Type':
                            'application/json'
                    }
                });
        let txt = await response.text();
        let res = JSON.parse(txt);
        if (res.error.length > 0) {
            return "API Error: " + res.error;
        }
        else {
            return "Product has been updated";
        }
    }
    catch (error: any) {
        return error.toString();
    }
};

export async function removeFromCart(productId: string): Promise<string> {
    let payload = JSON.stringify({ productId: productId, token: localStorage.getItem('token') });

    try {
        const response = await
            fetch(server + 'removeFromCart',
                {
                    method: 'POST', body: payload, headers: {
                        'Content-Type':
                            'application/json'
                    }
                });
        let txt = await response.text();
        let res = JSON.parse(txt);
        if (res.error.length > 0) {
            return "API Error: " + res.error;
        }
        else {
            return "Product has been removed";
        }
    }
    catch (error: any) {
        return error.toString();
    }
}


export async function getCart(): Promise<{products: IProduct[], error: string}> {
    let payload = JSON.stringify({ token: localStorage.getItem('token')});

    try {
        const response = await
            fetch(server + 'getCart',
                {
                    method: 'POST', body: payload, headers: {
                        'Content-Type':
                            'application/json'
                    }
                });
        let txt = await response.text();
        let json = JSON.parse(txt);
        if(json.error != '') {
            console.error(json.error);
            return { products: [], error: ''};
        }
        let raw = json.products;
        let products : IProduct[] = [];
        for(let i = 0; i < raw.length; i++)
        {
            let cur = raw[i];
            products.push({id: cur._id, name: cur.Product, description: cur.Description, price: cur.Price, ingredients: cur.Ingredients, weight: cur.Weight, amount: json.amounts[i]});
        }
        
        return { products: products, error: ''};
    }
    catch (error: any) {
        console.error(error);
        return { products: [], error: ''};
    }
}

export async function searchProduct(query: string, pageNum: number, productsPerPage: number): Promise<{products: IProduct[], numPages: number, error: string}> {
    let obj = { searchInput: query, productsPerPage: productsPerPage, pageNum: pageNum };
    let js = JSON.stringify(obj);
    try {
        const response = await
            fetch(server + 'searchProducts',
                {
                    method: 'POST', body: js, headers: {
                        'Content-Type':
                            'application/json'
                    }
                });
        let txt = await response.text();
        let rawProducts = JSON.parse(txt).products;
        const numPages = JSON.parse(txt).numPages;

        let products : IProduct[] = [];
        for(let i = 0; i < rawProducts.length; i++)
        {
            let cur = rawProducts[i];
            products.push({id: cur._id, name: cur.Product, description: cur.Description, price: cur.Price, ingredients: cur.Ingredients, weight: cur.Weight, amount: 1});
        }
        return { products: products, numPages: numPages, error: ''};
    }
    catch (error: any) {
        console.error(error.toString());
        return { products: [], numPages: 1, error: ''};
    }
};

export async function login(email: string, password: string) : Promise<{result: boolean, error: string}> {
    try {
        let obj = { email: email, password: password };
        let js = JSON.stringify(obj);
        const response = await fetch(server + 'login',   {
                method: 'POST', body: js, headers: 
                {
                    'Content-Type': 'application/json'
                }
            });
        let txt = await response.text();
        let jsRes = JSON.parse(txt);
        if(jsRes.error == '')
        {
            localStorage.setItem('token', jsRes.token);
            localStorage.setItem('role', jsRes.role);
            console.log(jsRes.role);
            return { result: true, error: '' };
        } 
        else {
            return { result: false, error: jsRes.error };
        }
    }
    catch(e: any) {
        return { result: false, error: e.toString() };        
    }
}

export async function register(firstname: string, lastname: string, email: string, password: string) : Promise<{result: boolean, error: string}> {
    try {
        let obj = { firstname: firstname, lastname: lastname, email: email, password: password };
        let js = JSON.stringify(obj);
        const response = await fetch(server + 'register',   {
                method: 'POST', body: js, headers: 
                {
                    'Content-Type': 'application/json'
                }
            });
        let txt = await response.text();
        let jsRes = JSON.parse(txt);
        if(jsRes.error == '')
        {
            localStorage.setItem('token', jsRes.token);
            return { result: true, error: '' };
        } 
        else {
            return { result: false, error: jsRes.error };
        }
    }
    catch(e: any) {
        return { result: false, error: e.toString() };        
    }
}

export async function registerAdmin(firstname: string, lastname: string, email: string, password: string) : Promise<{result: boolean, error: string}> {
    try {
        let obj = { firstname: firstname, lastname: lastname, email: email, password: password, token: localStorage.getItem('token') };
        let js = JSON.stringify(obj);
        const response = await fetch(server + 'registerAdmin',   {
                method: 'POST', body: js, headers: 
                {
                    'Content-Type': 'application/json'
                }
            });
        let txt = await response.text();
        let jsRes = JSON.parse(txt);
        console.log(txt);
        if(jsRes.error == '')
        {
            localStorage.setItem('token', jsRes.token);
            return { result: true, error: '' };
        } 
        else {
            return { result: false, error: jsRes.error };
        }
    }
    catch(e: any) {
        return { result: false, error: e.toString() };        
    }
}

