import { useContext, useEffect, useState } from 'react';
import { TokenContext } from '../../../Contexts/tokenContext';

export default function AddPhotoIdentite() {
    return (
        <div>
            <div className="input-group">
                <input
                    type="file"
                    className="form-control"
                    id="inputGroupFile04"
                    aria-describedby="inputGroupFileAddon04"
                    aria-label="Upload"
                />
            </div>
        </div>
    );
}
