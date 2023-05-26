import { useState } from 'react';
import { TUser } from '../../../Types/users';
import { userDefault } from '../../../constant/userDefault';
import { baseUrl } from '../../../constant/generalConst';

export function RegisterFinal(props: {
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    let [view, setView]: any = useState();
    let [view1, setView1]: any = useState();
    const type = view ? 'text' : 'password';
    const type1 = view1 ? 'text' : 'password';
    const [newUser, setNewUser] = useState<TUser>(userDefault);
    const inputChange = (e: React.BaseSyntheticEvent) => {
        const { name } = e.target;
        setNewUser((lastNewUser) => {
            return { ...lastNewUser, [name]: e.target.value };
        });
    };
    const reponse = () => {
        props.setPage('login');
        alert(
            'Félicitation vous êtes maintenant incrit et vous pouvez partager des souvenirs. Pour cela, veuillez vous connectez',
        );
    };
    const register = async (e: React.BaseSyntheticEvent) => {
        e.preventDefault();

        if (newUser.password !== newUser.passwordConfirmed) {
            return alert('Merci de vérifier votre mot de passe !!');
        }
        fetchData();
    };

    async function fetchData() {
        const response = await fetch(`${baseUrl}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser),
        });
        const responseJson = await response.json();
        responseJson.message !== 'Utilisateur enregistré'
            ? alert(responseJson.message)
            : reponse();
    }
    return (
        <div className="container">
            {' '}
            <button
                type="button"
                className="btn-close "
                aria-label="Close"
                onClick={() => {
                    props.setPage('accueil');
                }}
            ></button>
            <form className=" needs-validation " noValidate>
                <div>
                    <div>
                        <label
                            htmlFor="validationCustom01"
                            className="form-label"
                        >
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
                    </div>
                    <div className="valid-feedback">Looks good!</div>

                    <div>
                        <label
                            htmlFor="validationCustom02"
                            className="form-label"
                        >
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
                    <div>
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
                    </div>
                </div>

                <div>
                    <div className="">
                        <label
                            htmlFor="validationCustom09"
                            className="form-label"
                        >
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
                        />{' '}
                        <div className="invalid-feedback">
                            Renseignez un pseudo valide, svp.
                        </div>
                    </div>
                    <div className="">
                        <label
                            htmlFor="validationCustom10"
                            className="form-label"
                        >
                            Mot de passe
                        </label>
                        <input
                            placeholder="8 caractères minimum,contenant un majuscule, un caractère spécial et 2 nombres minumum !!"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32} "
                            name="password"
                            type={type}
                            className="form-control"
                            id="validationCustom10"
                            onChange={(e) => inputChange(e)}
                            required
                        />
                        <span>
                            {view ? (
                                <i
                                    className="bi bi-eye"
                                    onClick={() => setView(false)}
                                />
                            ) : (
                                <i
                                    className="bi bi-eye-slash"
                                    onClick={() => setView(true)}
                                />
                            )}
                        </span>
                        <div className="invalid-feedback">
                            Renseignez un mot de passe correct, svp.
                        </div>
                    </div>
                    <div className="">
                        <label
                            htmlFor="validationCustom11"
                            className="form-label"
                        >
                            Vérification du mot de passe
                        </label>
                        <input
                            placeholder="8 caractères minimum,contenant un majuscule, un caractère spécial et 2 nombres minumum !!"
                            name="passwordConfirmed"
                            pattern=" /^(?=.*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*]).*$/ "
                            type={type1}
                            className="form-control"
                            id="validationCustom11"
                            onChange={(e) => inputChange(e)}
                            required
                        />
                        <span>
                            {view1 ? (
                                <i
                                    className="bi bi-eye"
                                    onClick={() => setView1(false)}
                                />
                            ) : (
                                <i
                                    className="bi bi-eye-slash"
                                    onClick={() => setView1(true)}
                                />
                            )}
                        </span>
                        <div className="invalid-feedback">
                            Renseignez un mot de passe correct, svp.
                        </div>
                    </div>
                </div>

                <div>
                    <button
                        aria-label="enregistrer"
                        className="btn btn-primary mt-3"
                        type="submit"
                        onClick={(e) => register(e)}
                    >
                        Valider
                    </button>
                </div>
            </form>
        </div>
    );
}
