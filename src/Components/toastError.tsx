export function ToastError() {
    return (
        <div
            className="toast"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
        >
            <div className="toast-header">
                <img src="..." className="rounded me-2" alt="..." />
                <strong className="me-auto">Erreur de connexion</strong>
                <small>Erreur 401 </small>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="toast"
                    aria-label="Close"
                ></button>
            </div>
            <div className="toast-body">
                Compte inexistant ou votre mot de passe ou votre identifiant est
                incorrect !!
            </div>
        </div>
    );
}
