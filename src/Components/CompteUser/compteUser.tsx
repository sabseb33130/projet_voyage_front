import { useContext } from 'react';
import { UserContext } from '../../Contexts/userContext';
import DeleteUser from './deleteUser';
import EditUser from './editUser';
import { TAlbums } from '../../Types/albums';
import Card from '../album/card';

export function CompteUser(props: {
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const { user } = useContext(UserContext);
    console.log(user);

    return (
        <div className="row mt-3">
            <div
                className="col-2 card mx-auto mt-3 p-0"
                style={{ width: 18 + 'rem' }}
            >
                <img
                    src="./default-avatar-user.jpg"
                    className="card-img-top"
                    alt=""
                />
                <div className="card-body couleur">
                    <h5 className="card-title">{user.nom}</h5>

                    <div>Prénom: {user.prenom}</div>
                    <div>Adresse: {user.adresse_line1}</div>
                    <div>Complément adresse{user.adresse_line2}</div>
                    <div>{user.codepostal}</div>
                    <div>{user.ville}</div>
                    <div>{user.departement}</div>

                    <div className="mt-4">
                        <EditUser setPage={props.setPage} />

                        <DeleteUser />
                    </div>
                </div>
            </div>
            <div className="col-8 text-start">
                Mes Albums <Card />
            </div>
        </div>
    );
}
