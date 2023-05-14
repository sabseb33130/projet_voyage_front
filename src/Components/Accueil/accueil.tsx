export default function Accueil() {
    return (
        <div className="container-fluid text-center">
            <h4 className=" mb-5">
                Vous en avez assez de chercher vos photos partout.
                <br /> l'objectif de ce projet est de vous permettre de créer
                des albums rassemblant vos photos .
            </h4>
            <div className="container d-flex justify-content-between flex-wrap">
                <div className="container">
                    <img
                        src="image.png"
                        alt="accueil"
                        className="w-50 border border-6 rounded-4 mt-1 "
                    />
                </div>
                <div className="container">
                    <img
                        src="environnement.png"
                        className="  border border-6  rounded-4  mt-2 "
                        alt="environnement.png"
                    />
                </div>
            </div>
        </div>
    );
}
