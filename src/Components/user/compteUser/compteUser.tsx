import { useContext, useState } from 'react';
import DeleteUser from '../delete_update/deleteUser';
import EditUser from '../delete_update/editUser';
import Card from '../../album/card';
import { UserContext } from '../../../Contexts/userContext';

export function CompteUser(props: {
    token: string | null;
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const { user } = useContext(UserContext);

    const [preview] = useState<string>('./default-avatar-user.jpg');

    return (
        <div className="row mt-3">
            <div
                className="col-2 card mx-auto mt-3 p-0 "
                style={{ width: 18 + 'rem' }}
            >
                <img
                    src={preview}
                    style={{ width: 10 + 'rem' }}
                    className="card-img-top  mx-auto"
                    alt={user.pseudo}
                />
                <div
                    className="card-body couleur text-center
                "
                >
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
            <div className="col-8 text-start ">
                Mes Albums
                <div>
                    <Card token={props.token} setPage={props.setPage} />
                </div>
                <h3>Invitations envoyées</h3>
                {/*   {user.invitations.map((data, i) => (
                    <p key={i}>adresse: {data.invitation}</p>
                ))}{' '} */}
                <h3>Amis partageant mes albums :</h3>
                {user.friends.map((data, i) => (
                    <p key={i}> {data}</p>
                ))}
                {/*   <img src={URL.createObjectURL(photo)} alt="" /> */}
            </div>
        </div>
    );
}
