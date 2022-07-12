import { useState, useEffect } from 'react';
import * as firebaseService from '../services/firebaseService';

export const useImageState = (id, imageName, type) => {
    const [imageUrl, setImageUrl] = useState('');
    const imagePath = type === 'comics' ? `comics/${id}` : 'heroes';

    useEffect(() => {
        firebaseService.getImageFromFirebase(imageName, imagePath)
            .then(res => {
                setImageUrl(res);
            })
            .catch(() => {
                setImageUrl('')
            });
    }, [imageName, type, id, imagePath]);

    return [imageUrl, setImageUrl];
}

export const useDocumentState = (doc) => {
    const [document, setDocument] = useState({});

    useEffect(() => {
        firebaseService.getDocumentFromFirebase(doc)
            .then(res => {
                setDocument(res);
            })
            .catch(() => {
                setDocument('')
            });
    }, [doc]);

    return [document, setDocument];
}