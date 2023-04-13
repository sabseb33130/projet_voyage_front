import { CAvatar } from '@coreui/react';
import Login from '../login/login';

import './header.css';
import AddPhotos from '../photos/addPhotos';
export default function Navbar(props: {
    page: string;
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    return (
        <div>
            <div className="row justify-content-center">
                <h1 className="text-center col-10">
                    Nos Voyages,nos souvenirs
                </h1>
                <div className="col-2 ">
                    <Login setPage={props.setPage} />
                    <a className=" " onClick={() => props.setPage('register')}>
                        S'enregistrer
                    </a>
                </div>
            </div>
            <nav className="navbar navbar-expand-lg back">
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
                                        data-bs-toggle="modal"
                                        data-bs-target="#staticBackdrop"
                                        className="nav-link"
                                        aria-current="page"
                                        href="#"
                                        onClick={() => props.setPage('ajout')}
                                    >
                                        Inviter des amis
                                    </a>
                                </li>
                            </ul>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
