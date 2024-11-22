import TestUI from '../components/TestUI';
import TestBut from '../components/TestBut.tsx'
import TestLogin from '../components/TestLogin.tsx'

const TestPage = () => {
    return (
        <div>
            <TestBut/>
            <TestUI />
            <TestLogin />
            
        </div>
    );
}
export default TestPage;