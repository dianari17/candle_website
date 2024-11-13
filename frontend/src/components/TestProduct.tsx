import React, { useState } from 'react';
import { IProduct } from './IProduct'

import {deleteProduct} from './APICalls';

async function onDelete(e: any, productId: string) {
    e.preventDefault();
    console.log("Deleting id " + productId);
    let response = await deleteProduct(productId);
    console.log(response);
}

function TestProduct({id, name, price, image}: IProduct) {
    console.log("Received " + id + " " + name);
    return (
        <div>
            <p>Product Name: {name}</p>
            <p>Price: {price}</p>
            <p>Image link: {image}</p>
            <button>Add to cart</button>
            <button onClick={(e: any) => onDelete(e, id)}>Delete product</button>
        </div>
    );
}

export default TestProduct;