import React, { useState, useContext } from 'react';
import { TokenContext } from '../../Contexts/tokenContext';
import './login.css';

const urlLogin = 'http://localhost:8000/auth/login';

export default function Login(props: {
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const dataLogin = {
        pseudo: '',
        password: '',
    };

    const { setToken } = useContext(TokenContext);

    const [dataInput, setDataInput] = useState(dataLogin);

    const inputChange = (e: React.BaseSyntheticEvent) => {
        const { name, value } = e.target;
        setDataInput({ ...dataInput, [name]: value });
    };

    const login = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        console.log('123');

        async function fetchData() {
            const response = await fetch(urlLogin, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataInput),
            });

            const responseJson = await response.json();
            if (responseJson.statusCode === 401) {
                return props.setPage('erreur401');
            }
            setToken(responseJson.access_token);
            props.setPage('compte');
        }
        fetchData();
        return (e.target[0] = true);
    };

    return (
        <div>
            <button
                type="button"
                className="btn btn couleur text-light"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
            >
                Connexion
            </button>
            <form onSubmit={(e) => login(e)}>
                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content bleu">
                            <div className="modal-header">
                                <h1
                                    className="modal-title"
                                    id="exampleModalLabel"
                                >
                                    <i className="bi bi-box-arrow-in-right">
                                        {' '}
                                        CONNEXION
                                    </i>
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="container text-center">
                                    <label>
                                        <input
                                            onChange={(e) => inputChange(e)}
                                            type="text"
                                            name="pseudo"
                                            placeholder="pseudo"
                                        />
                                    </label>
                                    <br />
                                    <label className="mt-2">
                                        <input
                                            onChange={(e) => inputChange(e)}
                                            type="password"
                                            name="password"
                                            placeholder="password"
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Fermer
                                </button>
                                <button
                                    onClick={(e) => login(e)}
                                    type="submit"
                                    id="boutonLogin"
                                    className="btn btn-primary"
                                    data-bs-dismiss="modal"
                                >
                                    Valider
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
