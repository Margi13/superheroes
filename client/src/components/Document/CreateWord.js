import { useEffect, useState } from 'react';
import { buttonLabelsBG } from '../../common/labelsConstatnsBG';
import * as copyright from '../../documents/copyright';
import * as documentService from '../../services/documentService';

import { getImageFromFirebase } from '../../services/firebaseService';
import './Document.css';
const CreateWord = ({
    data,
    type,
    dataType,
    onCreate
    
}) => {
    const [buttonLabel, setButtonLabel] = useState('');
    useEffect(() => {
        switch (type) {
            case "copyright": {
                setButtonLabel(buttonLabelsBG.Copyright);
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
                const doc = copyright.generateCopyrightDocument(data, document, image, dataType);
                onCreate();
                documentService.saveDocumentToFile(doc, `${dataType}_${data._id}`, 'copyright', document._docOwnerId);
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