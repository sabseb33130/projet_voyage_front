import { useContext } from 'react';
import Login from '../user/login_logout/login';

import './header.css';
import Logout from '../user/login_logout/logout';
import { TokenContext } from '../../Contexts/tokenContext';
import { UserContext } from '../../Contexts/userContext';
import { Contact } from '../contact/contact';
import AddPhotos from '../photos/addPhotos';
import Album from '../album/album';

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
                                {' '}
                                <li className="nav-item dropdown me-4 mt-1">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Mon environnement
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                            >
                                                Mes albums
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                            >
                                                Mes photos
                                            </a>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                            >
                                                Mes invitations
                                            </a>
                                        </li>{' '}
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                            >
                                                Mes amis
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item mt-1">
                                    <Album />
                                </li>
                                <li className="nav-item mt-1">
                                    <AddPhotos />
                                </li>
                                <li className="nav-item mt-1">
                                    <Contact />
                                </li>{' '}
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
                                            className="nav-item  btn btn-primary me-3 btn-sm rounded-pill"
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
