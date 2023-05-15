import Login from '../../connexion/login_logout/login';
import Logout from '../../connexion/login_logout/logout';
import { Contact } from '../../contact/contact';
import Album from '../../album/createAlbum';
import { useContext } from 'react';
import { UserContext } from '../../../Contexts/userContext';
import './header.css';
export default function Navbar(props: {
    token: string | null;
    page: string;
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const { user } = useContext(UserContext);
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
                        {props.token ? (
                            <>
                                <li className="nav-item dropdown me-3 mt-1">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="/#"
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
                                                href="./#"
                                                onClick={() => {
                                                    props.setPage('compte');
                                                }}
                                            >
                                                Mon Compte
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="/#"
                                                onClick={() => {
                                                    props.setPage('photos');
                                                }}
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
                                                href="/#"
                                                onClick={() => {
                                                    props.setPage(
                                                        'invitations',
                                                    );
                                                }}
                                            >
                                                Mes invitations
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="/#"
                                                onClick={() => {
                                                    props.setPage('friends');
                                                }}
                                            >
                                                Mes amis
                                            </a>
                                        </li>
                                    </ul>
                                </li>

                                <li className="nav-item mt-1">
                                    <Album
                                        token={props.token}
                                        setPage={props.setPage}
                                    />
                                </li>

                                <li className="nav-item mt-1 ">
                                    <Contact
                                        token={props.token}
                                        setPage={props.setPage}
                                    />
                                </li>
                                <li className="nav-item mt-1 me-4">
                                    <div className="input-group rounded-pill">
                                        <input
                                            type="search"
                                            className="form-control rounded-pill mt-1"
                                            placeholder="Search"
                                            aria-label="Search"
                                            aria-describedby="search-addon"
                                        />
                                        <span
                                            className="input-group-text border-0"
                                            id="search-addon"
                                        >
                                            <i className="fas fa-search"></i>
                                        </span>
                                    </div>
                                </li>
                            </>
                        ) : (
                            ''
                        )}

                        <li>
                            {props.token ? (
                                <>
                                    <Logout setPage={props.setPage} />
                                </>
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
