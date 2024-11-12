import React, { useState } from 'react';

function TestUI() {
    const [message, setMessage] = React.useState('');
    const [searchResults, setResults] = React.useState('');
    const [productList, setProductList] = React.useState('');
    const [search, setSearchValue] = React.useState('');
    const [product, setProductName] = React.useState('');

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
                setMessage("API Error:" + res.error);
            }
            else {
                setMessage('Product has been added');
            }
        }
        catch (error: any) {
            setMessage(error.toString());
        }
    };

    // async function searchProduct(e: any): Promise<void> {
    //     e.preventDefault();
    //     let obj = { userId: userId, search: search };
    //     let js = JSON.stringify(obj);
    //     try {
    //         const response = await
    //             fetch('http://localhost:5000/api/searchproducts',
    //                 {
    //                     method: 'POST', body: js, headers: {
    //                         'Content-Type':
    //                             'application/json'
    //                     }
    //                 });
    //         let txt = await response.text();
    //         let res = JSON.parse(txt);
    //         let _results = res.results;
    //         let resultText = '';
    //         for (let i = 0; i < _results.length; i++) {
    //             resultText += _results[i];
    //             if (i < _results.length - 1) {
    //                 resultText += ', ';
    //             }
    //         }
    //         setResults('Product(s) have been retrieved');
    //         setProductList(resultText);
    //     }
    //     catch (error: any) {
    //         alert(error.toString());
    //         setResults(error.toString());
    //     }
    // }; 

    function handleSearchTextChange(e: any): void {
        setSearchValue(e.target.value);
    }

    function handleProductTextChange(e: any): void {
        setProductName(e.target.value);
    }

    return (
        <div id="productUIDiv">
            <br />
            Search: <input type="text" id="searchText" placeholder="Product To Search For"
                onChange={handleSearchTextChange} />
            <button type="button" id="searchProductButton" className="buttons"
                /*onClick={searchProduct}*/> Search Product</button><br />
            <span id="productSearchResult">{searchResults}</span>
            <p id="productList">{productList}</p><br /><br />
            Add: <input type="text" id="productText" placeholder="Product To Add"
                onChange={handleProductTextChange} />
            <button type="button" id="addProductButton" className="buttons"
                onClick={addProduct}> Add Product </button><br />
            <span id="productAddResult">{message}</span>
        </div>
    );
}
export default TestUI;