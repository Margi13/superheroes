import * as copyright from '../../../documents/copyright';
import * as request from '../../../documents/request';
import * as response from '../../../documents/response';
import * as useRights from '../../../documents/useRights';
import * as documentService from '../../../services/documentService';

import { getImageFromFirebase } from '../../../services/imageService'
const CreateWord = ({
    hero,
    type
}) => {
    const mockDocument = {
        _id: 1,
        _docOwnerId: 1,
        _dataOwnerId: 2,
        _dataId: 3,
        _createdOn: new Date(),
        _updatedOn: new Date(),
        message: 'Някакво съобщение',
        requestedDataType: 'hero',
        newDataType: 'comics',
        response: true
    }
    const create = async () => {
        const image = await getImageFromFirebase(hero.imageUrl, 'heroes')
        switch (type) {
            case "copyright": {
                const doc = copyright.generateCopyrightDocument(hero, undefined, image);
                documentService.saveDocumentToFile(doc, `hero_${hero._id}`, 'copyright', mockDocument._docOwnerId);
                break;
            }
            case "request": {
                const doc = request.generateRequestDocument(mockDocument);
                documentService.saveDocumentToFile(doc, `request_${hero._id}`, 'request', mockDocument._docOwnerId);
                break;
            }
            case "response": {
                const doc = response.generateResponseDocument(mockDocument);
                documentService.saveDocumentToFile(doc, `response_${hero._id}`, 'response', mockDocument._docOwnerId);
                break;
            }
            case "rights": {
                const doc = useRights.generateRightsDocument(mockDocument, image);
                documentService.saveDocumentToFile(doc, `rights_${hero._id}`, 'rights', mockDocument._docOwnerId);
                break;
            }
            default: {
                return "No document was created"
            }
        }
    }
    return (
        <>
            <button id="generate" onClick={create}>{type}</button>
        </>
    );
}

export default CreateWord;