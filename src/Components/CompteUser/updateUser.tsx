import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../Contexts/userContext';
import { TUser } from '../../Types/users';
import { TokenContext } from '../../Contexts/tokenContext';

const baseUrl = 'http://localhost:8000/users';
export default function UpdateUsers(props: {
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const { user, setUser } = useContext(UserContext);
    console.log(user);

    const [userData, setUserData] = useState(user);
    const { token, setToken } = useContext(TokenContext);
    const dataUser = user as TUser;

    const inputChange = (e: React.BaseSyntheticEvent) => {
        const { name, value } = e.target;
        if (name === 'passwordConfirmed') {
            console.log(value);

            setUserData({
                ...userData,
                [name]: value.toString(),
            });
        }
        setUserData({ ...userData, [name]: value });
    };
    console.log(userData);

    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState<string>('/default-avatar-user.jpg');
    useEffect(() => {
        if (!selectedFile) {
            setPreview('/default-avatar-user.jpg');
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);

        setPreview(objectUrl);

        return (
            //commande permettant d'enregistrer une modif de la photo de profil
            /*localStorage.setItem('photoprofil', objectUrl), */
            () => URL.revokeObjectURL(objectUrl)
        );
    }, [selectedFile]);

    const onSelectFile = (e: any) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }
        setSelectedFile(e.target.files[0]);
    };

    const update = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        if (typeof userData.passwordConfirmed === 'string') {
            setUserData({
                ...dataUser,
                passwordConfirmed: userData.passwordConfirmed as string,
            });
            console.log(userData.passwordConfirmed);
        }

        const jsonUser = JSON.stringify(userData);

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: jsonUser,
        };

        fetch(baseUrl, options)
            .then((response) => response.json())
            .then((donnee) => setUser(donnee.data.userUpdate))
            .catch((erreur) => `${erreur}`);
    };

    return (
        <div className="container-fluid">
            <form className="row g-3 needs-validation" noValidate>
                <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => {
                        props.setPage('erreur401');
                    }}
                ></button>
                <div className="col-md-3">
                    <label htmlFor="validationCustom01" className="form-label">
                        Prénom
                    </label>
                    <input
                        onChange={(e) => inputChange(e)}
                        type="text"
                        className="form-control"
                        id="validationCustom01"
                        name="prenom"
                        defaultValue={dataUser.prenom}
                        required
                    />
                    <div className="valid-feedback">Looks good!</div>
                </div>
                <div className="col-md-3">
                    <label htmlFor="validationCustom02" className="form-label">
                        Nom
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="validationCustom02"
                        name="nom"
                        defaultValue={dataUser.nom}
                        onChange={(e) => inputChange(e)}
                        required
                    />
                    <div className="valid-feedback">Looks good!</div>
                </div>
                <div className="col-md-4">
                    <label
                        htmlFor="validationCustomUsername"
                        className="form-label"
                    >
                        Email
                    </label>
                    <div className="input-group has-validation">
                        <span
                            className="input-group-text"
                            id="inputGroupPrepend"
                        >
                            @
                        </span>
                        <input
                            name="email"
                            defaultValue={dataUser.email}
                            type="email"
                            className="form-control"
                            id="validationCustomUsername"
                            aria-describedby="inputGroupPrepend"
                            onChange={(e) => inputChange(e)}
                            required
                        />
                        <div className="invalid-feedback">
                            Veuillez choisir un email correct !!!
                        </div>
                    </div>
                </div>{' '}
                <div className="col-md-4">
                    <label htmlFor="validationCustom03" className="form-label">
                        Adresse
                    </label>
                    <input
                        name="adresse_line1"
                        defaultValue={dataUser.adresse_line1}
                        placeholder="N°, type de rue, nom de rue"
                        type="text"
                        className="form-control"
                        id="validationCustom03"
                        onChange={(e) => inputChange(e)}
                        required
                    />
                    <div className="invalid-feedback">
                        Renseignez une adresse existante, svp.
                    </div>
                </div>
                <div className="col-md-4">
                    <label htmlFor="validationCustom04" className="form-label">
                        Complément d'adresse
                    </label>
                    <input
                        name="adresse_line2"
                        defaultValue={dataUser.adresse_line2}
                        type="text"
                        className="form-control"
                        id="validationCustom04"
                        onChange={(e) => inputChange(e)}
                        required
                    />
                    <div className="invalid-feedback"></div>
                </div>
                <div className="col-md-3">
                    <label htmlFor="validationCustom05" className="form-label">
                        Ville
                    </label>
                    <input
                        name="ville"
                        defaultValue={dataUser.ville}
                        type="text"
                        className="form-control"
                        id="validationCustom05"
                        onChange={(e) => inputChange(e)}
                        required
                    />
                    <div className="invalid-feedback">
                        Renseignez votre ville, svp.
                    </div>
                </div>
                <div className="col-md-3">
                    <label htmlFor="validationCustom06" className="form-label">
                        departement
                    </label>
                    <input
                        name="departement"
                        defaultValue={dataUser.departement}
                        type="text"
                        className="form-control"
                        id="validationCustom06"
                        onChange={(e) => inputChange(e)}
                        required
                    />
                    <div className="invalid-feedback">
                        Renseignez votre département correct, svp.
                    </div>
                </div>
                <div className="col-md-3">
                    <label htmlFor="validationCustom07" className="form-label">
                        Code Postal
                    </label>
                    <input
                        name="codepostal"
                        defaultValue={dataUser.codepostal}
                        type="text"
                        className="form-control"
                        id="validationCustom07"
                        onChange={(e) => inputChange(e)}
                        required
                    />
                    <div className="invalid-feedback">
                        Renseignez votre code postal, svp.
                    </div>
                </div>
                <div className="col-md-3">
                    <label htmlFor="validationCustom08" className="form-label">
                        Pays
                    </label>
                    <input
                        onChange={(e) => inputChange(e)}
                        defaultValue={dataUser.pays}
                        type="text"
                        name="pays"
                        className="form-control"
                        id="validationCustom08"
                        required
                    />
                    <div className="invalid-feedback">
                        Renseignez votre Pays, svp.
                    </div>
                </div>
                <div className="col-md-3">
                    <label htmlFor="validationCustom09" className="form-label">
                        Pseudo
                    </label>
                    <input
                        onChange={(e) => inputChange(e)}
                        name="pseudo"
                        defaultValue={dataUser.pseudo}
                        type="text"
                        placeholder="Veuillez saisir 5 caractères minimum"
                        className="form-control"
                        id="validationCustom09"
                        required
                    />
                    <div className="invalid-feedback">
                        Renseignez un pseudo valide, svp.
                    </div>
                </div>
                <div className="col-12">
                    <button
                        className="btn btn-primary"
                        type="submit"
                        onClick={(e) => update(e)}
                    >
                        Modifier
                    </button>
                </div>
            </form>
        </div>
    );
}
