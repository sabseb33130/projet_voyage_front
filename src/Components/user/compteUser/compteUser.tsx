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
        <div className="container-fluid d-flex justify-content-around flex-wrap mt-5">
            <div>
                {' '}
                <div
                    className="card-body couleur text-center mb-5
                "
                >
                    <h5 className="card-title">{user.nom}</h5>

                    <div>Prénom: {user.prenom}</div>
                    <div>Adresse: {user.adresse_line1}</div>
                    <div>Complément adresse{user.adresse_line2}</div>
                    <div>{user.codepostal}</div>
                    <div>{user.ville}</div>
                    <div>{user.departement}</div>

                    <div className="mt-4 d-flex justify-content-evenly">
                        <EditUser setPage={props.setPage} />

                        <DeleteUser setPage={props.setPage} />
                    </div>
                </div>
                <div>
                    <h3>Invitations envoyées</h3>
                    <p>
                        {user.invitations.map((data, i) => (
                            <>
                                <a href="./#" key={i}>
                                    adresse: {data.invitation}
                                </a>
                                <br />
                            </>
                        ))}
                    </p>
                </div>
            </div>
            <div className=" text-start ">
                <h5 className="strong">Mes Albums</h5>
                <div>
                    <Card token={props.token} setPage={props.setPage} />
                </div>
                <div className="d-flex justify-content-evenly wrap">
                    <div className="ms-3">
                        <h3>Amis partageant mes albums :</h3>
                        <p>
                            {user.friends.map((data, j) => (
                                <br key={j}> {data}</br>
                            ))}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
