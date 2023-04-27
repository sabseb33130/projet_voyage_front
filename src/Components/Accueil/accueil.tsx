export default function Accueil() {
    return (
        <div className="container">
            <h4 className="text-center">
                Vous en avez assez de chercher vos photos partout.
                <br /> l'objectif de ce projet est de vous permettre de créer
                des albums rassemblant vos photos .
            </h4>
            <div>
                <img
                    src="imageAlbum.png"
                    alt="imageAlbum"
                    style={{ height: 300, width: 300 }}
                    className="border border-1 rounded"
                />
            </div>
        </div>
    );
}
