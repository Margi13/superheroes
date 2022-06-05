const ImageUpload = ({
    name, 
    label,
    errorMessage,
    placeholder,
    type,
    defaultValue,
    changeHandler
}) => {
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