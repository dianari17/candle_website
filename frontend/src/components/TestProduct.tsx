import React, { useState } from 'react';
import { IProduct } from './IProduct'

import {deleteProduct, addToCart, removeFromCart, updateCartAmount } from './APICalls';

async function onDelete(e: any, productId: string) {
    e.preventDefault();
    let response = await deleteProduct(productId);
    console.log(response);
}

async function onAddToCart(e: any, productId: string) {
    e.preventDefault();

    let response = await addToCart(productId, 1);
    console.log(response);
}

async function onRemoveFromCart(e: any, productId: string) {
    e.preventDefault();

    let response = await removeFromCart(productId);
    console.log(response);
}

async function updateCart(e: any, productId: string) {
    e.preventDefault();

    let response = await updateCartAmount(productId, 5);
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
            <button onClick={(e: any) => onRemoveFromCart(e, id)}>Remove from Cart</button>
            <button onClick={(e: any) => updateCart(e, id)}>Increment in Cart</button>
        </div>
    );
}

export default TestProduct;