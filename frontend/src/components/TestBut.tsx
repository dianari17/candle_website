import React from 'react';
import {useNavigate} from 'react-router-dom'


function TestBut(){

    

const navigate = useNavigate();

 function moveAbt(){
    navigate('../pages/AboutPage.tsx')
}
function moveLog(){
    navigate('../components/TestLogin.tsx')
}
function moveSign(){
    navigate('../pages/Signup.tsx')
}
function moveCart(){
    navigate('../pages/CartPage.tsx')
}

return(
<div
        style={{
            backgroundColor: '#A48A79', // Light brown background
            padding: '15px 0', 
            width: '100%', 
            position: 'fixed', // Fixed at the top
            top: '0',
            left: '0',
            zIndex: '1000', // Ensure it stays above other content
            textAlign: 'center', // Center the text items
        }}
        >
            <button
                style={{
                    cursor: 'pointer',
                    color: '#FFF',
                    fontSize: '18px',
                    margin: '0 20px',
                    backgroundColor: '#A48A79',
                    textDecoration: 'none',
                    display: 'inline-block',
                }}
                onClick={moveAbt}
            >
                About
            </button>
            <button
                style={{
                    margin: '10px',
                    padding: '10px 20px',
                    fontSize: '16px',
                    border: 'none',
                    borderRadius: '5px',
                    backgroundColor: '#A48A79',
                    color: '#FFF',
                    cursor: 'pointer',
                }}
                onClick={moveLog}
            >
                Log In
            </button>
            <button
                style={{
                    margin: '10px',
                    padding: '10px 20px',
                    fontSize: '16px',
                    border: 'none',
                    borderRadius: '5px',
                    backgroundColor: '#A48A79',
                    color: '#FFF',
                    cursor: 'pointer',
                }}
                onClick={moveSign}
            >
                Sign Up
            </button>
            <button
                style={{
                    margin: '10px',
                    padding: '10px 20px',
                    fontSize: '16px',
                    border: 'none',
                    borderRadius: '5px',
                    backgroundColor: '#A48A79',
                    color: '#FFF',
                    cursor: 'pointer',
                }}
                onClick={moveCart}
            >
                Shopping Cart
            </button>
            


            <div
                style={{
                    backgroundImage: `url('/frame.svg')`, // Path to your SVG file
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100%',
                    height: '100vh', // Full viewport height
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    zIndex: '-1', // Ensure it stays behind all content
                }}
            ></div>

        </div>

    );



}

export default TestBut;