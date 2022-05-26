import { validationMessages } from '../../../common/messagesConstantsBG';
export const ChangeHandlers = (setErrors, setImage) => {
    const imageHandler = (e) => {

        if (e.target.files[0]) {
            console.log(e.target.files[0])
            const img = e.target.files[0]
            setImage(() => ({ img }));
        } else {
            setErrors(state => ({ ...state, image: validationMessages.requiredMessage }))
        }
    }
    const personNameChangeHandler = (e) => {
        let currentName = e.target.value;
        if (currentName === '') {
            setErrors(state => ({ ...state, personName: validationMessages.requiredMessage }));
        } else if (currentName.length < 3 || currentName.length > 30) {
            setErrors(state => ({ ...state, personName: validationMessages.PersonNameLength }));
        } else {
            setErrors(state => ({ ...state, personName: null }));
        }
    }

    const heroNameChangeHandler = (e) => {
        let currentName = e.target.value;
        if (currentName === '') {
            setErrors(state => ({ ...state, heroName: validationMessages.requiredMessage }));
        } else if (currentName.length < 3 || currentName.length > 30) {
            setErrors(state => ({ ...state, heroName: validationMessages.HeroNameLength }));
        } else {
            setErrors(state => ({ ...state, heroName: null }));

        }
    }
    const kindChangeHandler = (e) => {
        let currentKind = e.target.value;
        if (currentKind === '') {
            setErrors(state => ({ ...state, kind: validationMessages.requiredMessage }));
        } else if (currentKind.length < 2 || currentKind.length > 15) {
            setErrors(state => ({ ...state, kind: validationMessages.KindLength }));
        } else {
            setErrors(state => ({ ...state, kind: null }));

        }
    }
    const ageChangeHandler = (e) => {
        let currentAge = Number(e.target.value);
        if (currentAge <= 0) {
            setErrors(state => ({ ...state, age: validationMessages.AgeRange }));
        } else {
            setErrors(state => ({ ...state, age: null }));

        }
    }
    const storyChangeHandler = (e) => {
        let currentNameStory = e.target.value;
        if (currentNameStory === '') {
            setErrors(state => ({ ...state, story: validationMessages.requiredMessage }));
        } else if (currentNameStory.length < 10) {
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