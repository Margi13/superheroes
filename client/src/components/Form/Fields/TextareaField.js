const TextareaField = ({
    name, 
    label,
    errorMessage,
    placeholder,
    defaultValue,
    changeHandler
}) => {
    return (
        <>
            <label htmlFor={name}>{label}:</label>
            <textarea 
                id={name} name={name}
                defaultValue={defaultValue}
                placeholder={placeholder} 
                onBlur={changeHandler} 
                className={errorMessage ? 'error' : 'no-error'} 
            />
            <span className={errorMessage ? 'show error' : 'hide no-error'}>{errorMessage}</span>
        </>
    );
}

export default TextareaField;