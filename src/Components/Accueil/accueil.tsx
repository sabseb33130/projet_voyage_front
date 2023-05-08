export default function Accueil() {
    return (
        <div className="container-fluid">
            <h4 className="text-center mb-5">
                Vous en avez assez de chercher vos photos partout.
                <br /> l'objectif de ce projet est de vous permettre de créer
                des albums rassemblant vos photos .
            </h4>
            <div>
                <div id="carouselExampleIndicators" className="carousel slide">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img
                                src="image.png"
                                alt="image"
                                className=" rounded d-block w-50"
                            />
                        </div>
                        <div className="carousel-item">
                            <img
                                src="environnement.png"
                                className="d-block w-50"
                                alt="environnement.png"
                            />
                        </div>
                        <div className="carousel-item">
                            <img
                                src="logo_voyage.png"
                                className="d-block w-50"
                                alt="  logo.png"
                            />
                        </div>
                    </div>
                    <button
                        className="carousel-control-prev "
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="prev"
                    >
                        <span
                            className="carousel-control-prev-icon"
                            aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next text-dark ms-5"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="next"
                    >
                        <span
                            className="carousel-control-next-icon"
                            aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
