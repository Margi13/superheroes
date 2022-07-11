import { validationMessages } from '../../../common/messagesConstantsBG';
export const ChangeHandlers = (setErrors) => {

    const emailChangeHandler = (e) => {
        let currentEmail = e.target.value;
        let emailRegex = /[a-z].+@[a-zA-Z]+\.[a-zA-Z]+$/;
        if (currentEmail === '') {
            setErrors(state => ({ ...state, email: validationMessages.requiredMessage }));
        } else if (emailRegex.test(currentEmail)) {
            console.log(currentEmail)
            setErrors(state => ({ ...state, email: validationMessages.EmailRegex }));
        } else {
            setErrors(state => ({ ...state, email: null }));
        }
    }
    const passwordChangeHandler = (e) => {
        let currentPassword = e.target.value;
        let passwordRegex = /[^A-Za-z0-9]+/;
        if (currentPassword === '') {
            setErrors(state => ({ ...state, password: validationMessages.requiredMessage }));
        } else if (passwordRegex.test(currentPassword)) {
            setErrors(state => ({ ...state, password: validationMessages.PasswordSymbols }));
        } else if (currentPassword.length < 4 || currentPassword.length > 50) {
            setErrors(state => ({ ...state, password: validationMessages.PasswordLength }));
        } else {
            setErrors(state => ({ ...state, password: null }));
        }
    }
    return {
        emailChangeHandler,
        passwordChangeHandler
    }
}