import { useState } from 'react';
import { TUser } from '../../Types/users';
import { TAlbums } from '../../Types/albums';
export function RegisterFinal(props: {
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const newUser: TUser = {
        prenom: '',
        nom: '',
        pseudo: '',
        email: '',
        password: '',
        passwordConfirmed: '',
        adresse_line1: '',
        adresse_line2: '',
        ville: '',
        codepostal: '',
        departement: '',
        pays: '',
        albums: [
            {
                nom_album: '',
                userId: 0,
                date: '',
                photos: [],
            },
        ],
        photos: [{ nom_photo: '', id: 0 }],
    };

    const [user, setUser] = useState(newUser);
    const inputChange = (e: React.BaseSyntheticEvent) => {
        const { name, value } = e.target;

        setUser({ ...user, [name]: value });
    };

    const urlAddUser = 'http://localhost:8000/api/users';

    const login = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();

        if (user.password !== user.passwordConfirmed) {
            return alert('Merci de vérifier votre mot de passe !!');
        }
        async function fetchData() {
            const response = await fetch(urlAddUser, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });

            const responseJson = await response.json();

            alert(responseJson.message);
        }
        fetchData();
    };

    return (
        <div className="container">
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
                <div className="col-md-4">
                    <label htmlFor="validationCustom10" className="form-label">
                        Mot de passe
                    </label>
                    <input
                        placeholder="8 caractère minimum,contenant un majuscule et un caractère spécial minumum !!"
                        name="password"
                        type="password"
                        className="form-control"
                        id="validationCustom10"
                        onChange={(e) => inputChange(e)}
                        required
                    />
                    <div className="invalid-feedback">
                        Renseignez un mot de passe correct, svp.
                    </div>
                </div>
                <div className="col-md-4">
                    <label htmlFor="validationCustom11" className="form-label">
                        Vérification du mot de passe
                    </label>
                    <input
                        placeholder="8 caractère minimum,contenant un majuscule et un caractère spécial minumum !!"
                        name="passwordConfirmed"
                        type="password"
                        className="form-control"
                        id="validationCustom11"
                        onChange={(e) => inputChange(e)}
                        required
                    />
                    <div className="invalid-feedback">
                        Renseignez un mot de passe correct, svp.
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="invalidCheck"
                            required
                        />
                        <label
                            className="form-check-label"
                            htmlFor="invalidCheck"
                        >
                            Agree to terms and conditions
                        </label>
                        <div className="invalid-feedback">
                            You must agree before submitting.
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <button
                        className="btn btn-primary"
                        type="submit"
                        onClick={(e) => login(e)}
                    >
                        Submit form
                    </button>
                </div>
            </form>
        </div>
    );
}