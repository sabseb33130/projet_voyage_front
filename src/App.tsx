import { useState } from 'react';
import { CompteUser } from './Components/user/compteUser/compteUser';
import UpdateUsers from './Components/user/compteUser/updateUser';
import Login from './Components/user/login_logout/login';
import { RegisterFinal } from './Components/user/register/registerFinal';
import Header from './Components/header/header';
import './App.css';
import Card from './Components/album/card';
import { Contact } from './Components/contact/contact';
import GetPhotos from './Components/photos/getPhotos';
function App() {
    const [page, setPage] = useState('accueil');

    return (
        <div className="App back">
            <Header setPage={setPage} page={page} />
            <GetPhotos />
            {page === 'contact' && <Contact setPage={setPage} />}
            {page === 'card' && <Card setPage={setPage} />}
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
                    ></button>
                </div>
            )}{' '}
        </div>
    );
}

export default App;
