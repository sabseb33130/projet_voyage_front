import { useState } from 'react';
import './App.css';
import { Voyage } from './Components/voyage';
import { TokenContext } from './Contexts/tokenContext';

function App() {
    const [token, setToken] = useState('');
    return (
        <div className="App">
            <TokenContext.Provider value={{ token, setToken }} />
            <Voyage />
            <TokenContext.Provider value={{ token, setToken }} />
        </div>
    );
}

export default App;
