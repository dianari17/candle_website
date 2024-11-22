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


return(
    <><button onClick={moveAbt}>Go to About Page</button><button onClick={moveLog}>Go to Log In Page<></></button><button onClick={moveSign}>Go to Sign Up Page</button></>

);


}

export default TestBut;