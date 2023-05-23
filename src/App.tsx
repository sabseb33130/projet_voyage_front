import { useContext, useEffect, useState } from 'react';
import { CompteUser } from './Components/user/compteUser/compteUser';
import UpdateUsers from './Components/user/compteUser/updateUser';
import Login from './Components/connexion/login_logout/login';
import { RegisterFinal } from './Components/connexion/register/registerFinal';
import Header from './Components/Accueil/header/header';
import './App.css';
import Card from './Components/album/card';
import { Contact } from './Components/contact/contact';
import Accueil from './Components/Accueil/accueil';
import ViewAlbum from './Components/album/viewAlbum';
import Footer from './Components/Accueil/footer';
import GetAllPhotos from './Components/photos/getAllPhotos';
import Friends from './Components/user/compteUser/friends';
import Invitations from './Components/contact/invitation';
import { getUser } from './Components/user/compteUser/getUser';
import { UserContext } from './Contexts/userContext';

function App() {
    const token: string | null = localStorage.getItem('token');
    const { user, onUserChange } = useContext(UserContext);
    const verifConnect = token ? 'compte' : 'accueil';
    const [page, setPage] = useState(`${verifConnect}`);
    useEffect(() => {
        getUser(user, onUserChange);
        // eslint-disable-next-line
    }, [token]);

    return (
        <div className="App back mb-5">
            <Header token={token} setPage={setPage} page={page} />
            {page === 'accueil' && token === null && <Accueil />}
            {page === 'compte' && (
                <CompteUser token={token} setPage={setPage} />
            )}
            {page === 'photos' && <GetAllPhotos setPage={setPage} />}
            {page === 'contact' && <Contact token={token} setPage={setPage} />}
            {page === 'invitations' && <Invitations />}
            {page === 'friends' && <Friends />}
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
            )}
            <Footer />
        </div>
    );
}

export default App;
