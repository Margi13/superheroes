import { Packer } from 'docx'
import { saveAs } from 'file-saver'
import { copyrightUrl, useRightUrl } from '../common/urlConstants'
import * as firebaseService from './firebaseService'
import * as request from './requester';
export const saveDocumentToFile = (doc, fileName, type, userId) => {
    // Create a mime type that will associate the new file with Microsoft Word
    const mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    // Create a Blob object from Packer containing the Document instance and the mimeType
    Packer.toBlob(doc).then((blob) => {
        const docblob = blob.slice(0, blob.size, mimeType)
        console.log(type)
        firebaseService.handleDocumentUpload({ file: { doc: docblob, name: fileName }, folderName: type, _ownerId: userId }, () => { }, () => { })

        // Save the file using saveAs from the file-saver package
        saveAs(docblob, fileName);
    })
}

export const getAllCopyright = () => request.get(`${copyrightUrl}/list`);
export const getOneCopyright = (documentId) => request.get(`${copyrightUrl}/${documentId}`);
export const getFilteredCopyright = (dataId, ownerId, dataType) => request.get(`${copyrightUrl}?dataId=${dataId}&ownerId=${ownerId}&type=${dataType}`);

export const createCopyright = (documentData) => request.post(`${copyrightUrl}`, documentData, true);
export const deleteCopyright = (documentId) => request.post(`${copyrightUrl}/${documentId}`, null, true);

export const getAllUseRight = () => request.get(`${useRightUrl}/list`);
export const getAllUseRightByResponse = (response) => request.get(`${useRightUrl}/list?response=${response}`);
export const getFilteredUseRight = (dataId, dataOwnerId, docOwnerId) => request.get(`${useRightUrl}?dataId=${dataId}&dataOwnerId=${dataOwnerId}&docOwnerId=${docOwnerId}`);
export const getOneUseRight = (documentId) => request.get(`${useRightUrl}/${documentId}`);

export const createUseRight = (documentData) => request.post(`${useRightUrl}`, documentData, true);
export const updateUseRight = (documentId, documentData) => request.post(`${useRightUrl}/${documentId}`, documentData, true);
export const deleteUseRight = (documentId) => request.post(`${useRightUrl}/${documentId}`, null, true);