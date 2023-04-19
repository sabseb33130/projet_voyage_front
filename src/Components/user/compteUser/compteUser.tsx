import { useContext, useState } from 'react';
import DeleteUser from './deleteUser';
import EditUser from './editUser';
import Card from '../../album/card';
import { UserContext } from '../../../Contexts/userContext';

export function CompteUser(props: {
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const { user } = useContext(UserContext);
    console.log(user);
    const [preview, setPreview] = useState<string>('./default-avatar-user.jpg');
    return (
        <div className="row mt-3">
            <div
                className="col-2 card mx-auto mt-3 p-0"
                style={{ width: 18 + 'rem' }}
            >
                <img
                    src={preview}
                    className="card-img-top"
                    alt="photo de profil"
                />
                <div className="card-body couleur">
                    <h5 className="card-title">{user?.nom}</h5>

                    <div>Prénom: {user?.prenom}</div>
                    <div>Adresse: {user?.adresse_line1}</div>
                    <div>Complément adresse{user?.adresse_line2}</div>
                    <div>{user?.codepostal}</div>
                    <div>{user?.ville}</div>
                    <div>{user?.departement}</div>

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
