import { useState } from 'react';
import { CompteUser } from './Components/user/compteUser/compteUser';
import UpdateUsers from './Components/user/delete_update/updateUser';
import Login from './Components/user/login_logout/login';
import { RegisterFinal } from './Components/user/register/registerFinal';
import Header from './Components/Accueil/header/header';
import './App.css';
import Card from './Components/album/card';
import { Contact } from './Components/contact/contact';
import ViewPhoto from './Components/album/viewPhoto';
import Accueil from './Components/Accueil/accueil';
import ViewAlbum from './Components/album/viewAlbum';

function App() {
    const [page, setPage] = useState('accueil');
    const token: string | null = localStorage.getItem('token');
    return (
        <div className="App back">
            <Header token={token} setPage={setPage} page={page} />
            {/*   <GetPhotos /> */}
            {page === 'accueil' && <Accueil />}
            {page === 'contact' && token && (
                <Contact token={token} setPage={setPage} />
            )}
            {page === 'card' && token && (
                <Card setPage={setPage} token={token} />
            )}
            {page === 'login' && token && (
                <Login setPage={setPage} token={token} />
            )}
            {page === 'register' && token && (
                <RegisterFinal setPage={setPage} token={token} />
            )}
            {page === 'compte' && token && (
                <CompteUser setPage={setPage} token={token} />
            )}
            {page === 'update' && token && (
                <UpdateUsers setPage={setPage} token={token} />
            )}
            {/*      {page === 'photos' && token && (
                <ViewPhoto setPage={setPage} token={token} /> 
            )}*/}
            {page === 'viewAlbum' && token && (
                <ViewAlbum setPage={setPage} token={token} />
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
        </div>
    );
}

export default App;
