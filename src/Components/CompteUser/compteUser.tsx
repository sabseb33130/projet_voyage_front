import { useContext, useEffect } from 'react';
import { TokenContext } from '../../Contexts/tokenContext';
import { UserContext } from '../../Contexts/userContext';

export function CompteUser() {
    const { user } = useContext(UserContext);
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
                        <button className="btn btn-primary rounded me-2">
                            <i className="bi bi-pencil"></i>Modifier
                        </button>
                        <button className="btn btn-danger rounded">
                            <i className="bi bi-trash3"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-8 text-start">Mes Albums</div>
        </div>
    );
}
