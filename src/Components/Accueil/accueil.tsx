export default function Accueil() {
    return (
        <div className="container-fluid">
            <h4 className="text-center mb-5">
                Vous en avez assez de chercher vos photos partout.
                <br /> l'objectif de ce projet est de vous permettre de créer
                des albums rassemblant vos photos .
            </h4>
            <div className="d-flex justify-content-between flex-wrap">
                <div>
                    <img
                        src="image.png"
                        alt="accueil"
                        className="w-50 border border-6 border-dark rounded-4 mt-1 "
                    />
                </div>
                <div>
                    <img
                        src="environnement.png"
                        className=" w-50 border border-6 border-dark rounded-4  mt-2 "
                        alt="environnement.png"
                    />
                </div>
            </div>
        </div>
    );
}
