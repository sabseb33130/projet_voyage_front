import { useEffect, useState } from 'react';
import { TokenContext } from '../Contexts/tokenContext';
import Login from './login/login';
import Navbar from './header/header';
import { CompteUser } from './compteUser/compteUser';
import { UserContext } from '../Contexts/userContext';
import { TUser } from '../Types/users';
import { Contact } from './contact/contact';
import { RegisterFinal } from './register/registerFinal';
import UpdateUsers from './compteUser/updateUser';
import AddPhotos from './photos/addPhotos';
import Card from './album/card';
import GetPhotos from './photos/getPhotos';

export function Voyage() {
    const baseUrl = 'http://localhost:8000/api/users/comptePerso';
    const [user, setUser] = useState<TUser>({} as TUser);
    const [page, setPage] = useState('accueil');
    const [token, setToken] = useState('');

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    const logout = () => {
        setToken('');
        setUser(user);
        window.location.reload();
    };
    useEffect(() => {
        fetch(baseUrl, options)
            .then((response) => response.json())
            .then((donnee) => setUser(donnee))
            .catch((erreur) => `${erreur}`);
    }, [token]);

    return (
        <div className="container-fluid">
            <UserContext.Provider value={{ user, setUser }}>
                <TokenContext.Provider value={{ token, setToken }}>
                    <Navbar setPage={setPage} page={page} />
                    <GetPhotos />
                    {page === 'card' && <Card />}
                    {page === 'photos' && <AddPhotos />}
                    {page === 'ajout' && <Contact />}
                    {page === 'login' && <Login setPage={setPage} />}
                    {page === 'register' && <RegisterFinal setPage={setPage} />}
                    {page === 'compte' && <CompteUser setPage={setPage} />}
                    {page === 'update' && <UpdateUsers setPage={setPage} />}
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
