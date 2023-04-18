import { useContext } from 'react';
import { TokenContext } from '../../Contexts/tokenContext';

export default function Logout() {
    let { token } = useContext(TokenContext);
    const logout = () => {
        token = '';
        window.location.reload();
    };
    return (
        <div className="">
            <button className="btn btn coluleur " onClick={() => logout()}>
                Deconnexion
            </button>
        </div>
    );
}
