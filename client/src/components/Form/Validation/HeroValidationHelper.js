import { validationMessages } from '../../../common/messagesConstantsBG';
export const ChangeHandlers = (setErrors, setImage) => {
    const validFileExtensions = ["jpg", "jpeg", "bmp", "gif", "png"];
    const imageHandler = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            const size = file.size / 1024 / 1024;
            const nameParts = file.name.split('.');

            if (!validFileExtensions.includes(nameParts[nameParts.length - 1].toLowerCase())) {
                setErrors(state => ({ ...state, image: validationMessages.ImagesFormat }))
            } else if (size > 2) {
                setErrors(state => ({ ...state, image: validationMessages.ImageSize }));
            } else {
                setErrors(state => ({ ...state, image: null }));
                setImage(() => ({ file }));
            }
        } else {
            setErrors(state => ({ ...state, images: validationMessages.requiredMessage }))
        }
    }
    const personNameChangeHandler = (e) => {
        const currentName = e.target.value;
        if (currentName === '') {
            setErrors(state => ({ ...state, personName: validationMessages.requiredMessage }));
        } else if (currentName.length < 4 || currentName.length > 30) {
            setErrors(state => ({ ...state, personName: validationMessages.PersonNameLength }));
        } else {
            setErrors(state => ({ ...state, personName: null }));
        }
    }

    const heroNameChangeHandler = (e) => {
        const currentName = e.target.value;
        if (currentName === '') {
            setErrors(state => ({ ...state, heroName: validationMessages.requiredMessage }));
        } else if (currentName.length < 2 || currentName.length > 30) {
            setErrors(state => ({ ...state, heroName: validationMessages.HeroNameLength }));
        } else {
            setErrors(state => ({ ...state, heroName: null }));

        }
    }
    const kindChangeHandler = (e) => {
        const currentKind = e.target.value;
        if (currentKind === '') {
            setErrors(state => ({ ...state, kind: validationMessages.requiredMessage }));
        } else if (currentKind.length < 2 || currentKind.length > 15) {
            setErrors(state => ({ ...state, kind: validationMessages.KindLength }));
        } else {
            setErrors(state => ({ ...state, kind: null }));

        }
    }
    const ageChangeHandler = (e) => {
        const currentAge = Number(e.target.value);
        if (currentAge <= 0) {
            setErrors(state => ({ ...state, age: validationMessages.AgeRange }));
        } else {
            setErrors(state => ({ ...state, age: null }));

        }
    }
    const storyChangeHandler = (e) => {
        const currentStory = e.target.value;
        if (currentStory === '') {
            setErrors(state => ({ ...state, story: validationMessages.requiredMessage }));
        } else if (currentStory.length < 10) {
            setErrors(state => ({ ...state, story: validationMessages.StoryRange }));
        } else {
            setErrors(state => ({ ...state, story: null }));

        }
    }

    return {
        personNameChangeHandler,
        heroNameChangeHandler,
        kindChangeHandler,
        ageChangeHandler,
        storyChangeHandler,
        imageHandler
    }
}