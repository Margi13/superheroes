import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';

export const handleImageUpload = (data, setUrl, setProgress) => {
    if (!data.image) {
        throw new Error('There was no image uploaded!');
    }
    const storageRef = ref(storage, `images/${data.type}/${data.folderName}${data.image.name}`);

    const uploadTask = uploadBytesResumable(storageRef, data.image, { contentType: 'images/jpeg' });

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setUrl(downloadURL);
            });
        });
}
export const handleMultipleImagesUpload = (data, setUrls, setProgress) => {
    const promises = [];
    for (let i = 0; i < data.images.length; i++) {
        const image = data.images[i];
        const folder = data.folderName.split(' ').join('_');
        const storageRef = ref(storage, `images/${data.type}/${folder}/${image.name}`);

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
        .then(() => alert("All images uploaded"))
        .catch((err) => console.log(err));

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