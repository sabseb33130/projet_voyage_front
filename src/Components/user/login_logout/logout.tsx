import { useContext } from 'react';
import { userDefault } from '../../../constant/userDefault';
import { UserContext } from '../../../Contexts/userContext';

export default function Logout(props: {
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const { onUserChange } = useContext(UserContext);

    const logout = () => {
        onUserChange(userDefault);
        window.location.reload();
    };

    return (
        <div className="">
            <button
                className="btn btn-primary rounded-pill me-5 mt-1"
                onClick={() => logout()}
            >
                Deconnexion
            </button>
        </div>
    );
}
