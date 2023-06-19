import { useContext } from 'react';
import DeleteUser from '../delete_update/deleteUser';
import EditUser from '../delete_update/editUser';
import Card from '../../album/card';
import { UserContext } from '../../../Contexts/userContext';
import { InvitContext } from '../../../Contexts/invitContext';
import { baseUrl } from '../../../constant/generalConst';

export function CompteUser(props: {
    token: string | null;
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const { user } = useContext(UserContext);
    const { invit, setInvit } = useContext(InvitContext);

    const token = localStorage.getItem('token');

    if (invit.id !== '0') {
        fetch(`${baseUrl}/friend/${invit}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((response) =>
                response.statusCode === 201
                    ? (alert(
                          response.data.friends.map(
                              (data: { nom: any }) =>
                                  `Vous êtes maintenant amis avec ${data.nom}`,
                          ),
                      ),
                      setInvit({ id: '0' }))
                    : console.log(response),
            );
    }

    return (
        <div className="container-fluid d-flex justify-content-around flex-wrap mt-5">
            <div>
                <div className="card-body  text-center mb-5">
                    <h1 className="card-title">{user.pseudo}</h1>
                    <div>Nom: {user.nom}</div>
                    <div>Prénom: {user.prenom}</div>
                    <img src={user.photo_identite} alt={user.photo_identite} />
                    <p>{user.photo_identite}</p>
                    <div className="mt-4 d-flex justify-content-evenly">
                        <EditUser setPage={props.setPage} />

                        <DeleteUser setPage={props.setPage} />
                    </div>
                </div>
            </div>
            <div className=" text-start ">
                <h5 className="strong">Mes Albums</h5>
                <div>
                    <Card token={props.token} setPage={props.setPage} />
                </div>
            </div>
        </div>
    );
}
