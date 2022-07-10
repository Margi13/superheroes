const ImagesBulkUpload = ({
    name, 
    label,
    errorMessage,
    placeholder,
    type,
    changeHandler,
    setImages,
    images
}) => {
    //Should upload images from here
    //Should get images for Edit from here
    //All functionalities with these images should be here - uploadHelper.js
    return (
        <>
            <label htmlFor={name}>{label}:</label>
            <input type="file" multiple
                id={name} name={name}
                placeholder={placeholder}
                onChange={changeHandler} 
                className={errorMessage ? 'error' : 'no-error'} />
            <span className={errorMessage ? 'show error' : 'hide no-error'}>{errorMessage}</span>
        </>
    );
}

export default ImagesBulkUpload;