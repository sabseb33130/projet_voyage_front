import { SetStateAction, useContext } from 'react';
import Login from '../user/login_logout/login';
import { TokenContext } from '../../Contexts/tokenContext';
import Navbar from './navbarConnect';
import Logout from '../user/login_logout/logout';

export default function Header(props: {
    page: string;
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const { access_token } = useContext(TokenContext);

    return (
        <div className="container-fluid">
            <h1 className="text-center  ">Nos Voyages,nos souvenirs</h1>

            <Navbar setPage={props.setPage} page={props.page} />
        </div>
    );
}
