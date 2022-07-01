const NumberField = ({
    name, 
    label,
    errorMessage,
    placeholder,
    min,
    defaultValue,
    changeHandler
}) => {

    return (
        <>
            <label htmlFor={name}>{label}:</label>
            <input type="number" 
                id={name} name={name}
                defaultValue={defaultValue}
                min={min} 
                placeholder={placeholder} 
                onBlur={changeHandler} 
                className={errorMessage ? 'error' : 'no-error'} 
            />
            <span className={errorMessage ? 'show error' : 'hide no-error'}>{errorMessage}</span>
        </>
    );
}

export default NumberField;