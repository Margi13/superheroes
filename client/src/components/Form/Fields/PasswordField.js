const PasswordField = ({
    name, 
    label,
    errorMessage,
    defaultValue,
    changeHandler
}) => {

    return (
        <>
            <label htmlFor={name}>{label}</label>
            <input type="password"
                id={name} name={name}
                defaultValue={defaultValue}
                onBlur={changeHandler ? changeHandler : () => {}} 
                className={errorMessage? 'error' : 'no-error'} 
            />
            <span className={errorMessage ? 'show error' : 'hide no-error'}>{errorMessage}</span>
        </>
    );
}

export default PasswordField;