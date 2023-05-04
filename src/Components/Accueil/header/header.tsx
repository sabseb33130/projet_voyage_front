import Navbar from './navbarConnect';

export default function Header(props: {
    token: string | null;
    page: string;
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    // const { user } = useContext(UserContext);

    return (
        <div className="container-fluid">
            <h1 className="text-center  ">Nos voyages, nos souvenirs</h1>

            <Navbar
                token={props.token}
                setPage={props.setPage}
                page={props.page}
            />
        </div>
    );
}
