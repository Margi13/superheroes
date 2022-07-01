import { validationMessages } from '../../../common/messagesConstantsBG';
export const ChangeHandlers = (setErrors, setImage) => {
    const imagesHandler = (e) => {

        if (e.target.files) {
            console.log(e.target.files)
            const images = e.target.files
            setImage(() => ({ ...images }));
        } else {
            setErrors(state => ({ ...state, images: validationMessages.requiredMessage }))
        }
    }
    const titleChangeHandler = (e) => {
        let currentTitle = e.target.value;
        if (currentTitle === '') {
            setErrors(state => ({ ...state, title: validationMessages.requiredMessage }));
        } else if (currentTitle.length < 3 || currentTitle.length > 30) {
            setErrors(state => ({ ...state, title: validationMessages.TitleLength }));
        } else {
            setErrors(state => ({ ...state, title: null }));
        }
    }

    const genreChangeHandler = (e) => {
        let currentGenre = e.target.value;
        if (currentGenre === '') {
            setErrors(state => ({ ...state, genre: validationMessages.requiredMessage }));
        } else if (currentGenre.length > 30) {
            setErrors(state => ({ ...state, genre: validationMessages.GenreLength }));
        } else {
            setErrors(state => ({ ...state, genre: null }));
        }
    }

    const descriptionChangeHandler = (e) => {
        let currentDescription = e.target.value;
        if (currentDescription === '') {
            setErrors(state => ({ ...state, description: validationMessages.requiredMessage }));
        } else if (currentDescription.length < 10) {
            setErrors(state => ({ ...state, description: validationMessages.StoryRange }));
        } else {
            setErrors(state => ({ ...state, description: null }));

        }
    }

    return {
        titleChangeHandler,
        descriptionChangeHandler,
        imagesHandler,
        genreChangeHandler
    }
}