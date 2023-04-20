import { useContext, useEffect, useState } from 'react';
import { TokenContext } from './Contexts/tokenContext';
import Card from './Components/album/card';
import { CompteUser } from './Components/user/compteUser/compteUser';
import UpdateUsers from './Components/user/compteUser/updateUser';
import Login from './Components/user/login_logout/login';
import GetPhotos from './Components/photos/getPhotos';
import { RegisterFinal } from './Components/user/register/registerFinal';
import Header from './Components/header/header';
import { UserContext } from './Contexts/userContext';
import './App.css';
function App() {
    const baseUrl = 'http://localhost:8000/api/users/comptePerso';
    const { user, setUser } = useContext(UserContext);
    const [page, setPage] = useState('accueil');
    const { access_token } = useContext(TokenContext);

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
        },
    };

    useEffect(() => {
        fetch(baseUrl, options)
            .then((response) => response.json())
            .then((donnee) => setUser(donnee))
            .catch((erreur) => `${erreur}`);
    }, [access_token]);

    return (
        <div className="App back">
            <Header setPage={setPage} page={page} />
            <GetPhotos />
            {page === 'card' && <Card />}
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
            )}
        </div>
    );
}

export default App;
