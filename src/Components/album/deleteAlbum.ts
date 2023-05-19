import {useEffect} from 'react';
import { TAlbums } from '../../Types/albums';
import { TUser } from '../../Types/users';

export default function DeleteAlbum(
    albumId: string|undefined,
    user: TUser,
    onUserChange: (value: TUser) => void,
) {
    const token = localStorage.getItem('token');
   
    useEffect(()=>{
        const urlDelete = `http://localhost:8000/api/albums/${+albumId!}`;
        const options = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        
        fetch(urlDelete, options)
        .then((response) => response.json())
        .then((response) => {
            console.log(response);

            alert(response.message);
         //   delAlbumToUser(response.data);
         
    
       
        })
        .catch((err) => console.error(err));},[])
   
   
   /*  const delAlbumToUser = (value: TAlbums) => {
        const newModif = { ...user };
        newModif.albums = [
            ...newModif.albums.filter((elm) => elm.id !== +albumId),
        ];console.log(value);
        
        console.log(newModif.albums.filter((elm) => elm.id !== +albumId));

        onUserChange(newModif);
    }; */
}
