import { useState } from 'react';
import { CompteUser } from './Components/user/compteUser/compteUser';
import UpdateUsers from './Components/user/delete_update/updateUser';
import Login from './Components/user/login_logout/login';
import { RegisterFinal } from './Components/user/register/registerFinal';
import Header from './Components/Accueil/header/header';
import './App.css';
import Card from './Components/album/card';
import { Contact } from './Components/contact/contact';
import { token } from './constant/generalConst';
import ViewPhoto from './Components/album/viewPhoto';
import Accueil from './Components/Accueil/accueil';
import GetPhotos from './Components/photos/getPhotos';
import Profil from './Components/user/compteUser/profil';
import ViewAlbum from './Components/album/viewAlbum';
function App() {
    const [page, setPage] = useState('accueil');

    return (
        <div className="App back">
            <Header setPage={setPage} page={page} />
            <GetPhotos />
            {page === 'accueil' && <Accueil />}
            {page === 'contact' && <Contact setPage={setPage} />}
            {page === 'card' && <Card setPage={setPage} />}
            {page === 'login' && token && <Login setPage={setPage} />}
            {page === 'register' && <RegisterFinal setPage={setPage} />}
            {page === 'compte' && token && <CompteUser setPage={setPage} />}
            {page === 'update' && <UpdateUsers setPage={setPage} />}
            {page === 'photos' && <ViewPhoto setPage={setPage} />}
            {page === 'profil' && <Profil />}
            {page === 'viewAlbum' && <ViewAlbum setPage={setPage} />}
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
