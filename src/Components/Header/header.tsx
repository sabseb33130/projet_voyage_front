import { CAvatar } from '@coreui/react';
import { useState } from 'react';

import './header.css';
export default function Navbar(props: {
    page: string;
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const [visible, setVisible] = useState(false);

    return (
        <div>
            <div className="text-center">
                <CAvatar src="logo_voyage.png" size="xl" className="text-end" />
            </div>
            <div className="text-end me-5">
                <div>
                    <button
                        className="  btn btn-outline-primary mb-3"
                        onClick={() => props.setPage('register')}
                    >
                        S'enregistrer
                    </button>
                </div>
                <div>
                    <button
                        className=" btn btn-outline-success"
                        onClick={() => props.setPage('login')}
                    >
                        Login
                    </button>
                </div>
            </div>

            <nav className="navbar navbar-expand-lg bg-body-tertiary">
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
                                    className="nav-link active"
                                    aria-current="page"
                                    href="#"
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
            </nav>
        </div>
    );
}
