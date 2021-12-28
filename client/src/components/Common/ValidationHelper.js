import { validationMessages } from '../../common/messagesConstantsBG';
export const ChangeHandlers = (setErrors) => {

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
        } else if (currentKind.length < 2 || currentKind.length > 20) {
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
        } else if (currentNameStory.length < 10 || currentNameStory.length > 500) {
            setErrors(state => ({ ...state, story: validationMessages.StoryRange }));
        } else if (currentNameStory === 'some regex') {
            setErrors(state => ({ ...state, story: validationMessages.StorySymbols }));
        } else {
            setErrors(state => ({ ...state, story: null }));

        }
    }
    const imageChangeHandler = (e) => {
        let currentImage = e.target.value;
        if (currentImage === '') {
            setErrors(state => ({ ...state, image: validationMessages.requiredMessage }));
        } else {
            setErrors(state => ({ ...state, image: null }));

        }
    }

    return {
        personNameChangeHandler,
        heroNameChangeHandler,
        kindChangeHandler,
        ageChangeHandler,
        storyChangeHandler,
        imageChangeHandler
    }
}