import { useState } from 'react';
import { TokenContext } from '../Contexts/tokenContext';
import Login from './Login/login';

import Navbar from './Header/header';
import { Register } from './Register/register';
import { CompteUser } from './CompteUser/compteUser';
import { UserContext } from '../Contexts/userContext';
import { TUser } from '../Types/users';

export function Voyage() {
    const [user, setUser] = useState<TUser>({} as TUser);
    const [page, setPage] = useState('');
    console.log(page);
    const [token, setToken] = useState('');
    return (
        <div>
            <UserContext.Provider value={{ user, setUser }}>
                <TokenContext.Provider value={{ token, setToken }}>
                    <Navbar setPage={setPage} page={page} />
                    {page === 'login' && <Login setPage={setPage} />}
                    {page === 'register' && <Register setPage={setPage} />}
                    {page === 'compte' && <CompteUser />}
                    {page === 'erreur401' && (
                        <div
                            className="container mx-auto alert alert-warning m-auto alert-dismissible fade show"
                            role="alert"
                        >
                            <strong>ERREUR!</strong> Compte inexistant !?!
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="alert"
                                aria-label="Close"
                                onClick={(e) => setPage('login')}
                            ></button>
                        </div>
                    )}
                </TokenContext.Provider>
            </UserContext.Provider>
        </div>
    );
}
