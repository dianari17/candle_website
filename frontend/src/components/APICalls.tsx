import {IProduct} from './IProduct'

const server = 'http://localhost:5000/api/'

// TODO: Use IProduct for this
export async function addProduct(product : string): Promise<string> {
    let obj = { product: product };
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
    let payload = JSON.stringify({ productId: productId });
    try {
        const response = await
            fetch(server + 'deleteProduct', {
                method: 'POST', body: payload, headers: {
                    'Content-Type': 'application/json'
                }
            });
        let res = JSON.parse(await response.text());
        if(res.response.length > 0) {
            return "API Error: " + res.response;
        }
        else {
            return res.response;
        }
    }
    catch(error: any) {
        return error.toString();
    }

}

export async function addToCart(userId: string, productId: string): Promise<string> {

    let payload = JSON.stringify({ userId: userId, productId: productId, amount: "1" });

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

export async function getCart(userId: string): Promise<{products: IProduct[], error: string}> {
    let payload = JSON.stringify({userId: userId});

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
        let raw = JSON.parse(txt).products;
        let products : IProduct[] = [];
        console.log(raw.length);
        for(let i = 0; i < raw.length; i++)
        {
            let cur = raw[i];
            products.push({id: cur.ID, name: cur.Product, price: 0, image: " "});
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
            products.push({id: cur.ID, name: cur.Product, price: 0, image: " "});
        }
        
        return { products: products, error: ''};
    }
    catch (error: any) {
        return { products: [], error: ''};
    }
};