export default function EditUser(props: {
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const updated = (e: React.BaseSyntheticEvent) => {
        props.setPage('update');
    };

    return (
        <div>
            <button
                className="btn btn-primary couleur btn-lg rounded"
                onClick={(e) => updated(e)}
                type="button"
            >
                <i className="bi bi-pen "></i>
            </button>
        </div>
    );
}
