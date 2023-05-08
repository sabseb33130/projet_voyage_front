import { useContext, useEffect, useState } from 'react';
import { CompteUser } from './Components/user/compteUser/compteUser';
import UpdateUsers from './Components/user/delete_update/updateUser';
import Login from './Components/user/login_logout/login';
import { RegisterFinal } from './Components/user/register/registerFinal';
import Header from './Components/Accueil/header/header';
import './App.css';
import Card from './Components/album/card';
import { Contact } from './Components/contact/contact';

import Accueil from './Components/Accueil/accueil';
import ViewAlbum from './Components/album/viewAlbum';
import Footer from './Components/Accueil/footer';
import { getUser } from './Components/user/compteUser/getUser';
import { UserContext } from './Contexts/userContext';

function App() {
    const token: string | null = localStorage.getItem('token');
    const verifConnect = token ? 'compte' : 'accueil';
    const [page, setPage] = useState(`${verifConnect}`);
    const { user, onUserChange } = useContext(UserContext);

    useEffect(() => {
        getUser(token, user, onUserChange);
    }, [verifConnect === 'compte']);
    return (
        <>
            <div className="App back mb-5">
                <Header token={token} setPage={setPage} page={page} />
                {page === 'accueil' && <Accueil />}
                {page === 'compte' && token && (
                    <CompteUser token={token} setPage={setPage} />
                )}
                {page === 'contact' && (
                    <Contact token={token} setPage={setPage} />
                )}
                {page === 'card' && <Card token={token} setPage={setPage} />}
                {page === 'login' && <Login setPage={setPage} />}
                {page === 'register' && <RegisterFinal setPage={setPage} />}
                {page === 'update' && (
                    <UpdateUsers token={token} setPage={setPage} />
                )}
                {page === 'viewAlbum' && (
                    <ViewAlbum token={token} setPage={setPage} />
                )}
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
                        ></button>
                    </div>
                )}{' '}
                <Footer />
            </div>
        </>
    );
}

export default App;
