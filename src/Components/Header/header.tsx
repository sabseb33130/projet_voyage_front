import { useContext } from 'react';
import Login from '../user/login/login';
import { TokenContext } from '../../Contexts/tokenContext';
import Navbar from './navbarConnect';
import Logout from './logout';

export default function Header(props: {
    page: string;
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const { token } = useContext(TokenContext);

    return (
        <div className="justify-content-end">
            <h1 className="text-center z-0">Nos Voyages,nos souvenirs</h1>

            {token ? (
                <Logout />
            ) : (
                <>
                    <Login setPage={props.setPage} />
                    <a onClick={() => props.setPage('register')}>
                        S'enregistrer
                    </a>
                </>
            )}

            {token ? <Navbar page={props.page} setPage={props.setPage} /> : ''}
        </div>
    );
}
