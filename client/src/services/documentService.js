import { Packer } from 'docx'
import { saveAs } from 'file-saver'
import * as imageService from './imageService'
export const saveDocumentToFile = (doc, fileName, type, userId) => {
    // Create a mime type that will associate the new file with Microsoft Word
    const mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    // Create a Blob object from Packer containing the Document instance and the mimeType
    Packer.toBlob(doc).then((blob) => {
        const docblob = blob.slice(0, blob.size, mimeType)
        console.log(type)
        imageService.handleDocumentUpload({ file: { doc: docblob, name: fileName }, folderName: type, _ownerId: userId }, () => { }, () => { })

        // Save the file using saveAs from the file-saver package
        saveAs(docblob, fileName);
    })
}