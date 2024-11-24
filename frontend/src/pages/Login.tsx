import TestLogin from '../components/TestLogin';

const Login = () => {
    return (
        <div style={{ 
            backgroundImage: `url('/logo.svg')`, 
            backgroundRepeat: 'no-repeat',
            backgroundSize: '300px',
            backgroundPosition: 'top',
            position: 'absolute',
            top: '100',
            left: '0',
            backgroundColor: '#A48A79', 
            color: 'white', 
            height: '100vh', 
            width: '100vw', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            position: 'center', // Required for layering
            overflow: 'hidden' // Prevents anything from spilling outside
        }}>


           
            
            <TestLogin />
        </div>
    );
}
export default Login;
