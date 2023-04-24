import { SetStateAction, useContext } from 'react';

import Navbar from './navbarConnect';
import { UserContext } from '../../Contexts/userContext';

export default function Header(props: {
    page: string;
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const { user } = useContext(UserContext);

    return (
        <div className="container-fluid">
            <h1 className="text-center  ">Nos Voyages, nos souvenirs</h1>

            <Navbar setPage={props.setPage} page={props.page} />
        </div>
    );
}
