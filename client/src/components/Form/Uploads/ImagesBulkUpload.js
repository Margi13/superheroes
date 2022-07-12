const ImagesBulkUpload = ({
    name, 
    label,
    errorMessage,
    placeholder,
    changeHandler,
}) => {
    //Should upload images from here
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