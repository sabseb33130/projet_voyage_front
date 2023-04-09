export default function EditUser(props: {
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const eraser = (e: React.BaseSyntheticEvent) => {
        props.setPage('update');
    };

    return (
        <button
            className="btn btn-primary couleur btn-sm me-3  mt-2 pe-3 ms-2 border border-primary text-light col"
            onClick={(e) => eraser(e)}
            type="button"
        >
            Modifier
        </button>
    );
}
