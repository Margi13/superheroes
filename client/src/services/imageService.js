import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject, getBlob, uploadBytes } from 'firebase/storage';

export const handleImageUpload = (data, setUrl, setProgress) => {
    if (!data.image) {
        throw new Error('There was no image uploaded!');
    }
    const folder = data.folderName ? data.folderName.split(' ').join('_') : undefined;
    const url = folder ? `images/${data.type}/${folder}/${data.image.name}` : `images/${data.type}/${data.image.name}`
    const storageRef = ref(storage, url);

    const uploadTask = uploadBytesResumable(storageRef, data.image, { contentType: 'images/jpeg' });

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(progress);
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
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                console.log(url)
                setUrl(url);
            });
        });
    Promise.all([uploadTask])
        .then(() => console.log("Image uploaded"))
        .catch((err) => console.log(err));

}
export const handleDocumentUpload = (data, setUrl, setProgress) => {
    if (!data.file) {
        throw new Error('There was no image uploaded!');
    }
    const folder = data.folderName ? data.folderName : undefined;
    const url = folder ? `documents/${data._ownerId}/${folder}/${data.file.name}` : `documents/${data._ownerId}/${data.file.name}`
    const storageRef = ref(storage, url);

    const uploadTask = uploadBytesResumable(storageRef, data.file.doc);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(progress);
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
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                console.log(url)
                setUrl(url);
            });
        });
    Promise.all([uploadTask])
        .then(() => console.log("Document uploaded"))
        .catch((err) => console.log(err));

}
export const handleMultipleImagesUpload = (data, setUrls, setProgress) => {
    const promises = [];
    for (let i = 0; i < data.images.length; i++) {
        const image = data.images[i];
        const storageRef = ref(storage, `images/${data.type}/${data.folderName}/${image.name}`);

        const uploadTask = uploadBytesResumable(storageRef, image, { contentType: 'images/jpeg' });
        promises.push(uploadTask);

        uploadTask.on("state_changed",
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress);
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
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url)
                    setUrls((prevState) => [...prevState, url])
                });
            }
        );
    }

    Promise.all(promises)
        .then(() => console.log("All images uploaded"))
        .catch((err) => console.log(err));

}
export const getImageFromFirebase = (imageName, imagePath) => {
    const imageUrl = imagePath ? `images/${imagePath}` : 'images';
    const imageRef = ref(storage, `${imageUrl}/${imageName}`);

    return getDownloadURL(imageRef);

}
export const getImageRefFirebase = (imageName, imagePath) => {
    const imageUrl = imagePath ? `images/${imagePath}` : 'images';
    const imageRef = ref(storage, `${imageUrl}/${imageName}`);

    return getBlob(imageRef);

}
export const getMultipleImagesFromFirebase = (images, imagePath) => {
    const imageUrl = imagePath ? `images/${imagePath}` : 'images';
    const promises = [];
    images.forEach(imageName => {
        const imageRef = ref(storage, `${imageUrl}/${imageName}`);
        promises.push(getDownloadURL(imageRef));
    })

    return Promise.all(promises)
        .then((res) => { return res })
        .catch((err) => console.log(err));
}

export const deleteImageFromFirebase = (imageName, imagePath) => {
    // Create a reference to the file to delete
    const imageUrl = imagePath ? `images/${imagePath}` : 'images';
    const desertRef = ref(storage, `${imageUrl}/${imageName}`);
    // Delete the file
    return deleteObject(desertRef);
}
export const deleteMultipleImagesFromFirebase = (images, imagePath) => {
    // Create a reference to the file to delete
    const imageUrl = imagePath ? `images/${imagePath}` : 'images';
    const promises = [];
    images.forEach(imageName => {
        const desertRef = ref(storage, `${imageUrl}/${imageName}`);
        // Delete the file
        promises.push(deleteObject(desertRef));

        Promise.all(promises)
            .then(() => console.log("All images deleted"))
            .catch((err) => console.log(err));
    })
}