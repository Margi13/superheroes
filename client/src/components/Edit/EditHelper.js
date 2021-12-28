import { validationMessages } from '../../common/messagesConstantsBG';
export const ChangeHandlers = (setErrors) => {

    const personNameChangeHandler = (e) => {
        console.log('validation');
        let currentName = e.target.value;
        if (currentName.length < 3 || currentName.length > 20) {
            setErrors(state => ({ ...state, personName: validationMessages.PersonNameLength }));
        } else {
            setErrors(state => ({ ...state, personName: null }));
        }
    }

    const heroNameChangeHandler = (e) => {
        let currentName = e.target.value;
        if (currentName === '') {
            setErrors(state => ({ ...state, story: validationMessages.HeroNameRequired }));
        } else if (currentName.length < 3 || currentName.length > 20) {
            setErrors(state => ({ ...state, heroName: validationMessages.HeroNameLength }));
        } else {
            setErrors(state => ({ ...state, heroName: null }));

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
            setErrors(state => ({ ...state, story: validationMessages.StoryRequired }));
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
            setErrors(state => ({ ...state, image: validationMessages.ImageRequired }));
        } else {
            setErrors(state => ({ ...state, image: null }));

        }
    }

    return {
        personNameChangeHandler,
        heroNameChangeHandler,
        ageChangeHandler,
        storyChangeHandler,
        imageChangeHandler
    }
}