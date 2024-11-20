import React, { useState, useEffect } from 'react';
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

function TestProduct({id, name, description, price}: IProduct) {

    const [imageSrc, setImageSrc] = useState<string | null>(null);
    async function getImage() {
        try { 
            const response = await fetch('http://localhost:5000/api/productImage/' + id);
            if(!response.ok) {
                console.error("Failed to fetch image: " + response.statusText);
                return;
            }

            const image = await response.json();
            setImageSrc("data:" + image.contentType + ";base64, " + image.data);
        }
        catch(e: any) {
            console.error(e.toString());
        }
    }
    getImage();

    return (
        <div>
            <p>Product Name: {name}</p>
            <p>Description: {description}</p>
            <p>Price: {price}</p>
            { imageSrc ? 
            (<img src={imageSrc} alt={"Image of " + name}></img>) 
            : (<p>Loading image...</p>)
            }
            <button onClick={(e: any) => onAddToCart(e, id)}>Add to cart</button>
            <button onClick={(e: any) => onDelete(e, id)}>Delete product</button>
            <button onClick={(e: any) => onRemoveFromCart(e, id)}>Remove from Cart</button>
            <button onClick={(e: any) => updateCart(e, id)}>Increment in Cart</button>
        </div>
    );
}

export default TestProduct;