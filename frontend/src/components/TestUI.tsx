import React, { useState } from 'react';

function TestUI() {
    const [search, setSearchValue] = React.useState('');
    const [searchResults, setResults] = React.useState('');
    const [productList, setProductList] = React.useState('');


    const [addResult, setAddResult] = React.useState('');
    const [product, setProductName] = React.useState('');

    const [cartProduct, setCartProduct] = React.useState('');
    const [cartResult, setCartResult] = React.useState('');

    async function addProduct(e: any): Promise<void> {
        e.preventDefault();
        let obj = { product: product };
        let js = JSON.stringify(obj);
        try {
            const response = await
                fetch('http://localhost:5000/api/addProduct',
                    {
                        method: 'POST', body: js, headers: {
                            'Content-Type':
                                'application/json'
                        }
                    });
            let txt = await response.text();
            let res = JSON.parse(txt);
            if (res.error.length > 0) {
                setAddResult("API Error:" + res.error);
            }
            else {
                setAddResult('Product has been added');
            }
        }
        catch (error: any) {
            setAddResult(error.toString());
        }
    };

    async function searchProduct(e: any): Promise<void> {
        e.preventDefault();
        let obj = { search: search };
        let js = JSON.stringify(obj);
        try {
            const response = await
                fetch('http://localhost:5000/api/searchProducts',
                    {
                        method: 'POST', body: js, headers: {
                            'Content-Type':
                                'application/json'
                        }
                    });
            let txt = await response.text();
            let res = JSON.parse(txt);
            let _results = res.results;
            let resultText = '';
            for (let i = 0; i < _results.length; i++) {
                resultText += _results[i];
                if (i < _results.length - 1) {
                    resultText += ', ';
                }
            }
            setResults('Product(s) have been retrieved');
            setProductList(resultText);
        }
        catch (error: any) {
            alert(error.toString());
            setResults(error.toString());
        }
    };

    async function addToCart(e: any): Promise<void> {
        e.preventDefault();
        let obj = { userId: "test", productId: cartProduct, amount: "1" };
        let js = JSON.stringify(obj);
        try {
            const response = await
                fetch('http://localhost:5000/api/addToCart',
                    {
                        method: 'POST', body: js, headers: {
                            'Content-Type':
                                'application/json'
                        }
                    });
            let txt = await response.text();
            let res = JSON.parse(txt);
            if (res.error.length > 0) {
                setCartResult("API Error:" + res.error);
            }
            else {
                setCartResult('Product has been added');
            }
        }
        catch (error: any) {
            setCartResult(error.toString());
        }
    };

    function handleSearchTextChange(e: any): void {
        setSearchValue(e.target.value);
    }

    function handleProductTextChange(e: any): void {
        setProductName(e.target.value);
    }

    function handleCartAddTextChange(e: any): void {
        setCartProduct(e.target.value);
    }

    return (
        <div id="productUIDiv">
            <br />
            Search: <input type="text" id="searchText" placeholder="Product To Search For"
                onChange={handleSearchTextChange} />

            <button type="button" id="searchProductButton" className="buttons"
                onClick={searchProduct}> Search Product</button><br />
            <span id="productSearchResult">{searchResults}</span>
            <p id="productList">{productList}</p><br /><br />

            Add: <input type="text" id="productText" placeholder="Product To Add"
                onChange={handleProductTextChange} />
            <button type="button" id="addProductButton" className="buttons"
                onClick={addProduct}> Add Product </button><br />
            <span id="productAddResult">{addResult}</span>

            Add to Cart: <input type="text" id="cartText" placeholder="Product To Add"
                onChange={handleCartAddTextChange} />
            <button type="button" id="addProductToCartButton" className="buttons"
                onClick={addToCart}> Add Product To Cart </button><br />
            <span id="cartResult">{cartResult}</span>

        </div>
    );
}
export default TestUI;