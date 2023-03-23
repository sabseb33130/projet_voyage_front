import {
    CAvatar,
    CNavbar,
    CContainer,
    CNavbarBrand,
    CNavbarToggler,
    CCollapse,
    CNavbarNav,
    CNavItem,
    CNavLink,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CDropdownDivider,
    CForm,
    CFormInput,
    CButton,
} from '@coreui/react';
import { useState } from 'react';

import './navbar.css';
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

            <CNavbar className="navbar" expand="lg" colorScheme="light">
                <CContainer fluid>
                    <CNavbarBrand href="#">Navbar</CNavbarBrand>
                    <CNavbarToggler
                        aria-label="Toggle navigation"
                        aria-expanded={visible}
                        onClick={() => setVisible(!visible)}
                    />
                    <CCollapse className="navbar-collapse" visible={visible}>
                        <CNavbarNav>
                            <CNavItem>
                                <CNavLink href="#" active>
                                    Home
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink href="#">Link</CNavLink>
                            </CNavItem>
                            <CDropdown variant="nav-item" popper={false}>
                                <CDropdownToggle color="secondary">
                                    Dropdown button
                                </CDropdownToggle>
                                <CDropdownMenu>
                                    <CDropdownItem href="#">
                                        Action
                                    </CDropdownItem>
                                    <CDropdownItem href="#">
                                        Another action
                                    </CDropdownItem>
                                    <CDropdownDivider />
                                    <CDropdownItem href="#">
                                        Something else here
                                    </CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                            <CNavItem>
                                <CNavLink href="#" disabled>
                                    Disabled
                                </CNavLink>
                            </CNavItem>
                        </CNavbarNav>
                        <CForm className="d-flex">
                            <CFormInput
                                type="search"
                                className="me-2"
                                placeholder="Search"
                            />
                            <CButton
                                type="submit"
                                color="primary"
                                variant="outline"
                            >
                                Search
                            </CButton>
                        </CForm>
                    </CCollapse>
                </CContainer>
            </CNavbar>
        </div>
    );
}
