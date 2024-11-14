import React, { useState } from 'react';
import TestProduct from './TestProduct';
import { IProduct } from './IProduct';
import { addProduct, searchProduct, getCart } from './APICalls';

function TestUI() {
 


    const [addResult, setAddResult] = React.useState('');
    const [product, setProductName] = React.useState('');

    // const testProducts : IProduct[] = [
    //     { id: "-0", name: "Vacuum Cleaner", price: 19.99, image: "Imagine it" },
    //     { id: "-1", name: "Broom", price: 20.00, image: "Imagine this, too"},
    //     { id: "test", name: "Toothbrush", price: 30.00, image: "toothbruhs imge" }
    // ];


    const [search, setSearchValue] = React.useState('');
    const [searchResults, setResults] = React.useState('');
    const [products, setProducts] = React.useState<IProduct[]>(/*testProducts*/[]);

    const [cart, setCart] = React.useState<IProduct[]>([]);

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

    async function updateCart(e: any) {
        e.preventDefault();
        let res = await getCart("1");
        if(res.error)
        {
            console.error(res.error);
        }
        else
        {
            setCart(res.products);
        }
    }

    return (
        <div id="productUIDiv">
            <br />
            Search: <input type="text" id="searchText" placeholder="Product To Search For"
                onChange={handleSearchTextChange} />

            <button type="button" id="searchProductButton" className="buttons"
                onClick={onSearch}> Search Product</button><br />
            <span id="productSearchResult">{searchResults}</span>
            <h1>Available Products</h1>
            <div>
                {
                    products.map((product, index) => {
                        return <TestProduct key={index} {...product}/>
                    })
                }
            </div>
            <button onClick={updateCart}>Update Cart</button>
            <h1>Your Shopping Cart</h1>
            <div>
                {
                    cart.map((product, index) => {
                        return <TestProduct key={index} {...product}/>
                    })
                }
            </div>


            Add: <input type="text" id="productText" placeholder="Product To Add"
                onChange={handleProductTextChange} />
            <button type="button" id="addProductButton" className="buttons"
                onClick={onAdd}> Add Product </button><br />
            <span id="productAddResult">{addResult}</span>
        </div>
    );
}
export default TestUI;