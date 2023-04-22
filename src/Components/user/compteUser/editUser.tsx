export default function EditUser(props: {
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const eraser = (e: React.BaseSyntheticEvent) => {
        props.setPage('update');
    };

    return (
        <button
            className="btn btn-primary couleur btn-lg me-3  mt-2 pe-3 ms-2 border border-primary text-light col"
            onClick={(e) => eraser(e)}
            type="button"
        >
            <i className="bi bi-pen "></i>
        </button>
    );
}
