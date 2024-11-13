import React, { useState } from 'react';
import { IProduct } from './IProduct'

import {deleteProduct, addToCart } from './APICalls';

async function onDelete(e: any, productId: string) {
    e.preventDefault();
    console.log("Deleting id " + productId);
    let response = await deleteProduct(productId);
    console.log(response);
}

async function onAddToCart(e: any, productId: string) {
    e.preventDefault();

    let response = await addToCart("1", productId);
    console.log(response);
}

function TestProduct({id, name, price, image}: IProduct) {
    return (
        <div>
            <p>Product Name: {name}</p>
            <p>Price: {price}</p>
            <p>Image link: {image}</p>
            <button onClick={(e: any) => onAddToCart(e, id)}>Add to cart</button>
            <button onClick={(e: any) => onDelete(e, id)}>Delete product</button>
        </div>
    );
}

export default TestProduct;