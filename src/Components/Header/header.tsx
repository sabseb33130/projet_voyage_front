import { CAvatar } from '@coreui/react';
import Login from '../login/login';

import './header.css';
export default function Navbar(props: {
    page: string;
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    return (
        <div>
            <div className="text-center ">
                <CAvatar src="logo_voyage.png" size="xl" className="text-end" />
            </div>

            <div className="text-end  " id="connexion">
                <nav className="navbar navbar-expand-lg ">
                    <div className="container-fluid d-flex justify-content-end">
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
                            className="collapse navbar-collapse"
                            id="navbarSupportedContent"
                        >
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            aria-current="page"
                                            href="#"
                                        >
                                            Mes Albums
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link "
                                            aria-current="page"
                                            href="#"
                                        >
                                            Ajouter des photos
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            aria-current="page"
                                            href="#"
                                            onClick={() =>
                                                props.setPage('ajout')
                                            }
                                        >
                                            Inviter des amis
                                        </a>
                                    </li>
                                </ul>
                                <li className="nav-item d-flex justify-content-end">
                                    <a
                                        className="navItem mt-2 ms-5 "
                                        onClick={() =>
                                            props.setPage('register')
                                        }
                                    >
                                        S'enregistrer
                                    </a>
                                </li>
                                <li className="nav-item d-flex justify-content-end">
                                    <Login setPage={props.setPage} />
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}
