import { useContext } from 'react';
import Login from '../user/login/login';

import './header.css';
import Logout from './logout';
import { TokenContext } from '../../Contexts/tokenContext';
import { UserContext } from '../../Contexts/userContext';

export default function Navbar(props: {
    page: string;
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const { access_token } = useContext(TokenContext);
    const { user, setUser } = useContext(UserContext);
    return (
        <div className=" container-fluid border border-0">
            <nav className="navbar navbar-expand-lg justify-content-end border border-0">
                <button
                    className="navbar-toggler text-end  "
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="bi bi-person-circle"></i>
                </button>

                <div
                    className="collapse navbar-collapse justify-content-end"
                    id="navbarSupportedContent"
                >
                    <ul className="nav ">
                        {access_token ? (
                            <>
                                <li className="nav-item">
                                    <a
                                        className="nav-link"
                                        aria-current="page"
                                        href="#"
                                        onClick={() => props.setPage('card')}
                                    >
                                        Mes Albums
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link "
                                        aria-current="page"
                                        href="#"
                                        onClick={() => props.setPage('photos')}
                                    >
                                        Ajouter des photos
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link"
                                        aria-current="page"
                                        href="#"
                                        onClick={() => props.setPage('ajout')}
                                    >
                                        Inviter des amis
                                    </a>
                                </li>
                            </>
                        ) : (
                            ''
                        )}
                        <li>
                            {access_token ? (
                                <Logout setPage={props.setPage} />
                            ) : (
                                <>
                                    <li className="nav-item ">
                                        <Login setPage={props.setPage} />
                                    </li>
                                    <li>
                                        <button
                                            className="nav-item  btn btn-primary btn-sm"
                                            onClick={() =>
                                                props.setPage('register')
                                            }
                                        >
                                            S'enregistrer
                                        </button>
                                    </li>
                                </>
                            )}
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}
