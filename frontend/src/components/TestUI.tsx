import React, { useState } from 'react';
import TestProduct from './TestProduct';
import { IProduct } from './IProduct';
import { addProduct, searchProduct, addToCart } from './APICalls';

function TestUI() {
 


    const [addResult, setAddResult] = React.useState('');
    const [product, setProductName] = React.useState('');

    const [cartProduct, setCartProduct] = React.useState('');
    const [cartResult, setCartResult] = React.useState('');

    const testProducts : IProduct[] = [
        { id: "-0", name: "Vacuum Cleaner", price: 19.99, image: "Imagine it" },
        { id: "-1", name: "Broom", price: 20.00, image: "Imagine this, too"},
        { id: "test", name: "Toothbrush", price: 30.00, image: "toothbruhs imge" }
    ];


    const [search, setSearchValue] = React.useState('');
    const [searchResults, setResults] = React.useState('');
    const [products, setProducts] = React.useState<IProduct[]>(testProducts);

    async function onAdd(e: any) {
        e.preventDefault();
        setAddResult(await addProduct(product));
    }

    

    function handleSearchTextChange(e: any): void {
        setSearchValue(e.target.value);
    }

    function handleProductTextChange(e: any): void {
        setProductName(e.target.value);
    }

    function handleCartAddTextChange(e: any): void {
        setCartProduct(e.target.value);
    }

    async function onSearch(e: any) {
        e.preventDefault();
        let res : {products: IProduct[], error: string } = await searchProduct(search);
        if(res.error)
        {
            setResults(res.error);
        }
        else
        {
            setResults("Loaded products successfully.");
            setProducts(res.products);
        }
    }

    async function onAddToCart(e: any) {
        e.preventDefault();
        let res : string = await addToCart(cartProduct);
        setCartResult(res);
    }

    return (
        <div id="productUIDiv">
            <br />
            Search: <input type="text" id="searchText" placeholder="Product To Search For"
                onChange={handleSearchTextChange} />

            <button type="button" id="searchProductButton" className="buttons"
                onClick={onSearch}> Search Product</button><br />
            <span id="productSearchResult">{searchResults}</span>
            <div>
                {
                    products.map((product, index) => {
                        return <TestProduct key={index} {...product}/>
                    })
                }
            </div>

            Add: <input type="text" id="productText" placeholder="Product To Add"
                onChange={handleProductTextChange} />
            <button type="button" id="addProductButton" className="buttons"
                onClick={onAdd}> Add Product </button><br />
            <span id="productAddResult">{addResult}</span>

            Add to Cart: <input type="text" id="cartText" placeholder="Product To Add"
                onChange={handleCartAddTextChange} />
            <button type="button" id="addProductToCartButton" className="buttons"
                onClick={onAddToCart}> Add Product To Cart </button><br />
            <span id="cartResult">{cartResult}</span>

        </div>
    );
}
export default TestUI;