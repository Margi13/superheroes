import { validationMessages } from '../../../common/messagesConstantsBG';
export const ChangeHandlers = (setErrors, setImages) => {
    const validFileExtensions = ["jpg", "jpeg", "bmp", "gif", "png"];
    const imagesHandler = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const files = e.target.files;
            let size = 0;
            let isValid = true;
            for (const img of Object.values(files)) {
                const nameParts = img.name.split('.')
                if (!validFileExtensions.includes(nameParts[nameParts.length - 1].toLowerCase())) {
                    isValid = false;
                    break;
                }
                size += img.size
            }
            size = size / 1024 / 1024;
            if (!isValid) {
                setErrors(state => ({ ...state, images: validationMessages.ImagesFormat }))
            } else if (size > 100) {
                setErrors(state => ({ ...state, images: validationMessages.ComicsSize }));
            } else {
                setImages(() => ({ files }));
                setErrors(state => ({ ...state, images: null }));
            }
        } else {
            setErrors(state => ({ ...state, images: validationMessages.requiredMessage }))
        }
    }
    const titleChangeHandler = (e) => {
        let currentTitle = e.target.value;
        if (currentTitle === '') {
            setErrors(state => ({ ...state, title: validationMessages.requiredMessage }));
        } else if (currentTitle.length < 2 || currentTitle.length > 30) {
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