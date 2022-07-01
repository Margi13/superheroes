const ImageUpload = ({
    name, 
    label,
    errorMessage,
    placeholder,
    type,
    defaultValue,
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
            <input type="file"
                id={name} name={name}
                // defaultValue={defaultValue}
                placeholder={placeholder}
                onChange={changeHandler} 
                className={errorMessage ? 'error' : 'no-error'} />
            <span className={errorMessage ? 'show error' : 'hide no-error'}>{errorMessage}</span>
        </>
    );
}

export default ImageUpload;