import { useState } from 'react';
import './App.css';
import { Voyage } from './Components/voyage';
import { TokenContext } from './Contexts/tokenContext';

function App() {
    const [token, setToken] = useState('');
    return (
        <div className="App back">
            <TokenContext.Provider value={{ token, setToken }}>
                <Voyage />
            </TokenContext.Provider>
        </div>
    );
}

export default App;
