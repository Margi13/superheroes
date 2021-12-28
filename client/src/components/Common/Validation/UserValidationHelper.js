import { validationMessages } from '../../../common/messagesConstantsBG';
export const ChangeHandlers = (setErrors) => {

    const emailChangeHandler = (e) =>{
        let currentEmail = e.target.value;
        let emailRegex = /[^A-Za-z0-9]+@[a-z]+\.[a-z]+$/;
        if (currentEmail === '') {
            setErrors(state => ({ ...state, email: validationMessages.requiredMessage }));
        } else if (emailRegex.test(currentEmail)) {
            console.log(currentEmail)
            setErrors(state => ({ ...state, email: validationMessages.EmailRegex }));
        } else {
            setErrors(state => ({ ...state, email: null }));
        }
    }
    const passwordChangeHandler = (e)=>{
        let currentPassword = e.target.value;
        let passwordRegex = /[^A-Za-z0-9]+/;
        if (currentPassword === '') {
            setErrors(state => ({ ...state, password: validationMessages.requiredMessage }));
        } else if (passwordRegex.test(currentPassword)) {
            setErrors(state => ({ ...state, password: validationMessages.PasswordSymbols }));
        } else if (currentPassword.length < 6 || currentPassword.length > 20) {
            setErrors(state => ({ ...state, password: validationMessages.PasswordLength }));
        }else {
            setErrors(state => ({ ...state, password: null }));
        }
    }
    return {
        emailChangeHandler,
        passwordChangeHandler
    }
}