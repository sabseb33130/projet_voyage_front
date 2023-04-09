export default function Card() {
    return (
        <div className="card" style={{ width: 8 + 'rem' }}>
            <img
                className="card-img-top"
                src="logo_voyage.png"
                alt="Card image cap"
            />
            <div className="card-body info">
                <h5 className="card-title">Album vacance </h5>
                <a href="#" className="btn btn-primary">
                    Allez go{' '}
                </a>
            </div>
        </div>
    );
}
