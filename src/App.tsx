import { SetStateAction, useEffect, useState } from 'react';
import './App.css';

import { TokenContext } from './Contexts/tokenContext';
import { UserContext } from './Contexts/userContext';
import Card from './Components/album/card';
import { CompteUser } from './Components/user/compteUser/compteUser';
import UpdateUsers from './Components/user/compteUser/updateUser';
import { Contact } from './Components/contact/contact';
import Navbar from './Components/header/navbarConnect';
import Login from './Components/user/login/login';
import AddPhotos from './Components/photos/addPhotos';
import GetPhotos from './Components/photos/getPhotos';
import { RegisterFinal } from './Components/user/register/registerFinal';
import { TUser } from './Types/users';
import Header from './Components/header/header';

function App() {
    const [token, setToken] = useState('');
    const baseUrl = 'http://localhost:8000/api/users/comptePerso';
    const [user, setUser] = useState<TUser>({} as TUser);
    const [page, setPage] = useState('accueil');

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        fetch(baseUrl, options)
            .then((response) => response.json())
            .then((donnee) => setUser(donnee))
            .catch((erreur) => `${erreur}`);
    }, [token]);
    console.log(page);

    return (
        <div className="App container-fluid back">
            <UserContext.Provider value={{ user, setUser }}>
                <TokenContext.Provider value={{ token, setToken }}>
                    <Header setPage={setPage} page={page} />
                    {/*   <Navbar setPage={setPage} page={page} /> */}
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

export default App;
