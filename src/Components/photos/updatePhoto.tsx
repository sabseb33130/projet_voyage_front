import { useContext, useState } from 'react';
import { AlbumContext } from '../../Contexts/albumContext';
import { updatePhoto } from '../../Types/photos';
import { photoConstant } from '../../constant/photoContant';
import { Button } from 'antd';

export default function UpdatePhoto() {
    const { albumNumber } = useContext(AlbumContext);
    const token = localStorage.getItem('token');
    const [newDescription, setNewDescription] =
        useState<updatePhoto>(photoConstant);

    const inputChange = (e: React.BaseSyntheticEvent) => {
        const { value } = e.target;
        setNewDescription(value);
    };

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

    async function fetchData() {
        const response = await fetch(
            'http://localhost:8000/api/photos/454',
            options,
        );

        const responseJson = await response.json();

        console.log(responseJson);
    }
    fetchData();
    return (
        <>
            <input
                type="text"
                name="description"
                title="description"
                onChange={(e) => inputChange(e)}
            />
        </>
    );
}
