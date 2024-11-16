import {IProduct} from './IProduct'

const server = 'http://localhost:5000/api/'

// TODO: Use IProduct for this
export async function addProduct(product : string): Promise<string> {
    let obj = { product: product, token: localStorage.getItem('token') };
    let js = JSON.stringify(obj);
    try {
        const response = await
            fetch(server + 'addProduct', {
                    method: 'POST', body: js, headers: {
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

export async function deleteProduct(productId: string) : Promise<string> {
    let payload = JSON.stringify({ productId: productId, token: localStorage.getItem('token') });
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

export async function addToCart(productId: string): Promise<string> {

    let payload = JSON.stringify({ productId: productId, amount: "1", token: localStorage.getItem('token') });

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
            products.push({id: cur._id, name: cur.Product, price: 0, image: " "});
        }
        
        return { products: products, error: ''};
    }
    catch (error: any) {
        console.error(error);
        return { products: [], error: ''};
    }
}

export async function searchProduct(query: string): Promise<{products: IProduct[], error: string}> {
    let obj = { search: query };
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
        let raw = JSON.parse(txt).results;
        let products : IProduct[] = [];
        for(let i = 0; i < raw.length; i++)
        {
            let cur = raw[i];
            products.push({id: cur._id, name: cur.Product, price: 0, image: " "});
        }
        
        return { products: products, error: ''};
    }
    catch (error: any) {
        return { products: [], error: ''};
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

