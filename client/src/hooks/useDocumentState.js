import { useState, useEffect } from 'react';
import * as documentService from '../services/documentService';
import * as firebaseService from '../services/firebaseService';

export const useOneDocumentState = (id) => {
    const [document, setDocument] = useState({});

    useEffect(() => {
        documentService.getOneCopyright(id)
            .then(res => {
                setDocument(res);
            });
    }, [id, setDocument]);

    return [document, setDocument];
}

export const useAllDocumentsState = () => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        documentService.getAllCopyright()
            .then(res => {
                setDocuments(res);
            });
    }, [setDocuments]);

    return [documents, setDocuments];
}

export const useMyDocumentsState = (ownerId) => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        documentService.getOwnCopyrights(ownerId)
            .then(res => {
                const result = res.sort((a,b) => a.status - b.status);
                setDocuments(result);
            });
    }, [ownerId, setDocuments]);

    return [documents, setDocuments];
}

export const useDownloadDocumentState = (id) => {
    const [documentUrl, setDocumentUrl] = useState({});

    useEffect(() => {
        documentService.getOneCopyright(id)
        .then(res => {
                firebaseService.getDocumentFromFirebase(res)
                .then(doc => {
                    setDocumentUrl(doc);
                })
                .catch(() => {
                    setDocumentUrl('')
                })
            });
    }, [id, setDocumentUrl]);

    return [documentUrl, setDocumentUrl];
}