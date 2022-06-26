import { useEffect, useState } from 'react';
import { buttonLabelsBG } from '../../common/labelsConstatnsBG';
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
    onCreate
}) => {
    const [buttonLabel, setButtonLabel] = useState('');
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
        }
    }, [type, setButtonLabel]);

    const create = async () => {
        const imageUrl = dataType === 'comics' ? data.coverPage : data.imageUrl
        const imagePath = dataType === 'comics' ? `comics/${data._id}` : 'heroes'

        const image = await getImageFromFirebase(imageUrl, imagePath)
        switch (type) {
            case "copyright": {
                const mockDocument = {
                    _id: 1,
                    _userId: 1,
                    dataType,
                    _createdOn: new Date()
                }
                const doc = copyright.generateCopyrightDocument(data, mockDocument, image, dataType);
                onCreate();
                documentService.saveDocumentToFile(doc, `${dataType}_${data._id}`, 'copyright', mockDocument._docOwnerId);
                break;
            }
            case "request": {
                const mockDocument = {
                    _id: 1,
                    _docOwnerId: 1,
                    _dataOwnerId: 2,
                    _createdOn: new Date(),
                    _updatedOn: new Date(),
                    message: 'Някакво съобщение',
                    requestedDataType: 'heroes',
                    newDataType: 'comics',
                    response: true
                }
                const doc = request.generateRequestDocument(data, mockDocument);
                onCreate();
                documentService.saveDocumentToFile(doc, `request_${mockDocument._id}`, 'request', mockDocument._docOwnerId);
                break;
            }
            case "response": {
                const mockDocument = {
                    _id: 1,
                    _docOwnerId: 1,
                    _dataOwnerId: 2,
                    _createdOn: new Date(),
                    _updatedOn: new Date(),
                    message: 'Някакво съобщение',
                    requestedDataType: 'heroes',
                    newDataType: 'comics',
                    response: true
                }
                const doc = response.generateResponseDocument(data, mockDocument);
                onCreate();
                documentService.saveDocumentToFile(doc, `response_${mockDocument._id}`, 'response', mockDocument._docOwnerId);
                break;
            }
            case "rights": {
                const mockDocument = {
                    _id: 1,
                    _docOwnerId: 1,
                    _dataOwnerId: 2,
                    _createdOn: new Date(),
                    _updatedOn: new Date(),
                    message: 'Някакво съобщение',
                    requestedDataType: 'heroes',
                    newDataType: 'comics',
                    response: true
                }
                const doc = useRights.generateRightsDocument(data, mockDocument, image);
                onCreate();
                documentService.saveDocumentToFile(doc, `rights_${mockDocument._id}`, 'rights', mockDocument._docOwnerId);
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