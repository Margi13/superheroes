import { useEffect, useState } from 'react';
import { buttonLabelsBG } from '../../common/labelsConstatnsBG';
import { useAuthContext } from '../../contexts/AuthContext';
import * as copyright from '../../documents/copyright';
import * as request from '../../documents/request';
import * as response from '../../documents/response';
import * as useRights from '../../documents/useRights';
import * as documentService from '../../services/documentService';

import { getImageFromFirebase } from '../../services/imageService';
import './Document.css';
const CreateWord = ({
    data,
    type,
    dataType,
    onCreate,
    docId
}) => {
    const [buttonLabel, setButtonLabel] = useState('');
	const { user } = useAuthContext()
    useEffect(() => {
        switch (type) {
            case "copyright": {
                setButtonLabel(buttonLabelsBG.Copyright);
                break;
            }
            case "request": {
                setButtonLabel(buttonLabelsBG.Request);
                break;
            }
            case "response": {
                setButtonLabel(buttonLabelsBG.Response);
                break;
            }
            case "rights": {
                setButtonLabel(buttonLabelsBG.UseRights);
                break;
            }
            default: break;
        }
    }, [type, setButtonLabel]);

    const create = async () => {
        const imageUrl = dataType === 'comics' ? data.coverPage : data.imageUrl
        const imagePath = dataType === 'comics' ? `comics/${data._id}` : 'heroes'

        const image = await getImageFromFirebase(imageUrl, imagePath)
        switch (type) {
            case "copyright": {
                const document = await documentService.getFilteredCopyright(data._id, data._ownerId, dataType);
                console.log('document:',document)
                const doc = copyright.generateCopyrightDocument(data, document, image, dataType);
                onCreate();
                documentService.saveDocumentToFile(doc, `${dataType}_${data._id}`, 'copyright', document._docOwnerId);
                break;
            }
            case "request": {
                const document = await documentService.getFilteredUseRight(data._id, data._ownerId, user._id);
                const doc = request.generateRequestDocument(data, document);
                onCreate();
                documentService.saveDocumentToFile(doc, `request_${document._id}`, 'request', document._docOwnerId);
                break;
            }
            case "response": {
                const document = await documentService.getOneCopyright(docId);
                const doc = response.generateResponseDocument(data, document);
                onCreate();
                documentService.saveDocumentToFile(doc, `response_${document._id}`, 'response', document._docOwnerId);
                break;
            }
            case "rights": {
                const document = await documentService.getOneCopyright(docId);
                const doc = useRights.generateRightsDocument(data, document, image);
                onCreate();
                documentService.saveDocumentToFile(doc, `rights_${document._id}`, 'rights', document._docOwnerId);
                break;
            }
            default: {
                console.log("No document was created")
            }
        }
    }
    return (
        <>
            {buttonLabelsBG.Create}:
            <button className="generate-document" onClick={create}>{buttonLabel}</button>
        </>
    );
}

export default CreateWord;