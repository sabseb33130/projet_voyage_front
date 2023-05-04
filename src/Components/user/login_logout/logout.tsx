import { useContext } from 'react';
import { userDefault } from '../../../constant/userDefault';
import { UserContext } from '../../../Contexts/userContext';

export default function Logout(props: {
    setPage: React.Dispatch<React.SetStateAction<string>>;
    token: string | null;
}) {
    const { onUserChange } = useContext(UserContext);

    const logout = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        onUserChange(userDefault);
        localStorage.removeItem('token');
        props.setPage('accueil');
    };

    return (
        <div className="">
            <button
                className="btn btn-primary rounded-pill me-5 mt-1"
                onClick={(e) => logout(e)}
            >
                Deconnexion
            </button>
        </div>
    );
}
