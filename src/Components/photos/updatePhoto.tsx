import { useContext,  useState } from 'react';
import { AlbumContext } from '../../Contexts/albumContext';
import { updatePhoto } from '../../Types/photos';
import { photoConstant } from '../../constant/photoContant';
import {TAlbums} from '../../Types/albums';
import {Button} from 'antd';
import {UserContext} from '../../Contexts/userContext';

export default function UpdatePhoto(props:{numberPhoto:string , albumView: TAlbums,
    setAlbumView: React.Dispatch<TAlbums>,  setAffichage:React.Dispatch<React.SetStateAction<string | undefined>> } ) {
    const { albumNumber } = useContext(AlbumContext);
    const {user}=useContext(UserContext)
    const token = localStorage.getItem('token');
    const [newDescription, setNewDescription] = useState<updatePhoto>(photoConstant);
    const inputChange = (e: React.BaseSyntheticEvent) => {
        const { value } = e.target;
        setNewDescription(value);
    };
const [defaultValue,setDefaultValue]=useState(user.albums.find(elm=>elm.id===+albumNumber)?.photos.find((elm)=>elm.id===+props.numberPhoto)?.description);


    const test = JSON.stringify({
        albumId: albumNumber,
        description: newDescription,
    });

    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': ' application/json',
            Authorization: `Bearer ${token}`,
        },
        body: test,
    };
  

  const envoi=(e:React.BaseSyntheticEvent)=>{ 
    e.preventDefault();
    fetch(`http://localhost:8000/api/photos/${props.numberPhoto}`, options)
    .then((response) => response.json())
    .then((response) => {console.log(response.data.description);
       const newAlbumView = { ...props.albumView };
        newAlbumView.photos.push(response.data);
        props.setAlbumView(newAlbumView); 
        setDefaultValue(response.data.description)
    })}

const[testa,setTesta]=useState(true)
 
   
    return (
        <> <button className="btn btn-warning btn-sm rounded mb-2 ms-3   mt-3 me-2">
        <i
            className="bi bi-arrow-counterclockwise"
            onClick={() =>  props.setAffichage(undefined)}
        ></i>
    </button>{testa?
      ( <div>
            <label className="text-center">
                Description de la photo : {defaultValue}
            </label>
        </div>): (<input
                type="text"
                name="description"
                title="description"
                defaultValue={defaultValue}
                onChange={(e) => inputChange(e)} />)}
                {testa? (<Button
                            className="btn btn-primary rounded mb-2  ms-3"
                            onClick={() => {
                               setTesta(false)}
                            }
                        >
                            <i className="bi bi-pen"></i>
                        </Button>):(<Button
                    className="btn btn-success rounded mb-2  ms-3"
                    onClick={(e) => { envoi(e);setTesta(true)} }>
                    Valider
                </Button>)}
        </>
    );
}
