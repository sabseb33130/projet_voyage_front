import { CAvatar } from '@coreui/react';
import { SetStateAction, useState } from 'react';
import Login from '../Login/login';

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
                                        className="navItem mt-2 "
                                        onClick={() =>
                                            props.setPage('register')
                                        }
                                    >
                                        S'enregistrer
                                    </a>
                                </li>
                                <li className="nav-item d-flex justify-content-end">
                                    <Login
                                        setPage={function (
                                            value: SetStateAction<string>,
                                        ): void {
                                            throw new Error(
                                                'Function not implemented.',
                                            );
                                        }}
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

            {/*   <nav className="navbar navbar-expand-lg  back">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"></a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarNavDropdown"
                    >
                           <ul className="navbar-nav">
                            <li className="nav-item">
                                <a
                                    className="nav-link active"
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
                                    onClick={() => props.setPage('ajout')}
                                >
                                    Ajouter des photos
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link active"
                                    aria-current="page"
                                    href="#"
                                >
                                    Inviter des amis
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav> */}
        </div>
    );
}
