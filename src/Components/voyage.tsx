import { useState } from 'react';
import { TokenContext } from '../Contexts/tokenContext';
import Login from './login';

import Navbar from './navbar';
import { Register } from './register';

export function Voyage() {
    const [page, setPage] = useState('');
    console.log(page);
    const [token, setToken] = useState('');
    return (
        <div>
            {' '}
            <TokenContext.Provider value={{ token, setToken }} />
            <Navbar setPage={setPage} page={page} />
            {page === 'login' && <Login />}
            {page === 'register' && <Register />}
            <TokenContext.Provider value={{ token, setToken }} />
        </div>
    );
}
