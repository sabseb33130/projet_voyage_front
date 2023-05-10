export default function Accueil() {
    return (
        <div className="container-fluid">
            <h4 className="text-center mb-5">
                Vous en avez assez de chercher vos photos partout.
                <br /> l'objectif de ce projet est de vous permettre de créer
                des albums rassemblant vos photos .
            </h4>
            <div className="d-flex justify-content-between flex-wrap">
                <div className="mx-auto">
                    <img
                        src="image.png"
                        alt="image"
                        className=" d-block w-75 border border-6 border-dark rounded-4 mt-1 mx-auto"
                    />
                </div>
                <div className="mx-auto">
                    <img
                        src="environnement.png"
                        className="d-block w-75 border border-6 border-dark rounded-4  mt-2 mx-auto"
                        alt="environnement.png"
                    />
                </div>
            </div>
        </div>
    );
}
