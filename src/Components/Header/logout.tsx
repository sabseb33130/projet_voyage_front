import { useContext } from 'react';
import { TokenContext } from '../../Contexts/tokenContext';
import { userDefault } from '../../constant/userDefault';
import { UserContext } from '../../Contexts/userContext';

export default function Logout(props: {
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const { user, setUser } = useContext(UserContext);
    let { access_token, onTokenChange } = useContext(TokenContext);
    /*     let { user, setUser } = useContext(UserContext); */

    const logout = () => {
        onTokenChange(null);
        /*  window.location.reload; */
        setUser(user);

        /*  props.setPage('accueil'); */
    };
    console.log('log', user);
    console.log('constant', userDefault);
    console.log(access_token);

    return (
        <div className="">
            <button className="btn btn-primary  " onClick={() => logout()}>
                Deconnexion
            </button>
        </div>
    );
}
