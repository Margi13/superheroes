import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';

export const handleImageUpload = (image) => {
    if (!image) {
        throw new Error('There was no image uploaded!');
    }
    const storageRef = ref(storage, `images/${image.name}`);

    const uploadTask = uploadBytesResumable(storageRef, image, { contentType: 'images/jpeg' });

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                default: break;
            }
        },
        (error) => {
            //error function
            console.log(error);
        },
        () => {
            //complete function
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
            });
        });
}

export const getImageFromFirebase = (imageName) => {
    var imageRef = ref(storage, `images/${imageName}`);

    return getDownloadURL(imageRef);

}

export const deleteImageFromFirebase = (imageName) => {
    // Create a reference to the file to delete
    const desertRef = ref(storage, `images/${imageName}`);
    // Delete the file
    return deleteObject(desertRef);
}