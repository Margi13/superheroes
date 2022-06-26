import Form from '../Form';
import { useState } from 'react';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import * as superheroService from '../../../services/superheroService';
import * as imageService from '../../../services/imageService';
import * as documentService from '../../../services/documentService';
import useHeroState from '../../../hooks/useHeroState';
import { useAuthContext } from '../../../contexts/AuthContext';

import { formLabelsBG, placeholdersBG } from '../../../common/labelsConstatnsBG';
import { alertMessages } from '../../../common/messagesConstantsBG';
import { typesColor, useNotificationContext } from '../../../contexts/NotificationContext';
import { ChangeHandlers } from '../../Common/Validation/HeroValidationHelper';
import TextField from '../Fields/TextField';
import NumberField from '../Fields/NumberField';
import ImageUpload from '../Uploads/ImageUploadField';
import TextareaField from '../Fields/TextareaField';

const initialErrorState = { personName: null, heroName: null, kind: null, age: null, image: null, story: null }

const HeroForm = ({
    type
}) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { addNotification } = useNotificationContext();
    const { user } = useAuthContext();
    const [image, setImage] = useState({ image: null, url: '' });
    const [errors, setErrors] = useState(initialErrorState);
    const [superhero] = useHeroState(id);

    if (superhero._ownerId && user._id !== superhero._ownerId) {
        return <Navigate to="/" />
    }

    const handlers = ChangeHandlers(setErrors, setImage);

    const imageHandler = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0]
            setImage(() => ({ file }));
        }
    }

    const create = (heroData, image) => {
        superheroService.create(heroData, image)
            .then((result) => {
                if (result.type) {
                    console.log(result.message)
                    throw new Error(result.message);
                }
                const data = {
                    image: image, type: 'heroes'
                }
                imageService.handleImageUpload(data, setImage, () => { });
                const document = {
                    dataId: result._id,
                    dataType: "heroes"
                }
                documentService.createCopyright(document);
                addNotification(alertMessages.CreateSuccess, typesColor.success);
                navigate('/');
            })
            .catch(error => {
                addNotification(alertMessages.CreateDenied, typesColor.error);
                console.log(error);
            });
    }
    const edit = (id, heroData, image) => {
        superheroService.update(id, { data: heroData })
            .then(() => {
                const data = {
                    image: image, type: 'heroes'
                }
                imageService.handleImageUpload(data, setImage, () => { });
                addNotification(alertMessages.EditSuccess, typesColor.success);
                navigate(`/details/heroes/${id}`)
            })
            .catch(error => {
                addNotification(alertMessages.EditDenied, typesColor.error);
                console.log(error);
            })
    }
    const checkForError = (heroData) => {
        if (heroData.personName === '' || heroData.heroName === '' || heroData.kind === '' || !heroData.age || heroData.image === '' || heroData.story === '') {
            addNotification(alertMessages.EnteredNoData, typesColor.error);
            return 0;
        }
        if (errors.personName || errors.heroName || errors.kind || errors.age || errors.image || errors.story) {
            console.log(errors)
            addNotification(alertMessages.EnteredInvalidData, typesColor.error);
            return 0;
        }

        return 1;
    }
    const onHeroCreate = async (e) => {
        e.preventDefault();

        let heroData = Object.fromEntries(new FormData(e.currentTarget));
        heroData.age = Number(heroData.age);
        const isValid = checkForError(heroData);

        heroData.imageUrl = image.file ? image.file.name : superhero.imageUrl;
        if (isValid && type === 'create') {
            create(heroData, image.file);
        } else if (isValid && type === 'edit') {
            edit(superhero._id, heroData, image.file);
        }
    }

    return (
        <section id={type + "-page"} className="auth">
            <Form onSubmit={onHeroCreate} type={type}>
                <TextField name="personName"
                    label={formLabelsBG.PersonName}
                    defaultValue={superhero.personName}
                    placeholder={placeholdersBG.PersonName}
                    errorMessage={errors.personName}
                    changeHandler={handlers.personNameChangeHandler}
                />
                <TextField name="heroName"
                    label={formLabelsBG.HeroicName}
                    defaultValue={superhero.heroName}
                    placeholder={placeholdersBG.HeroicName}
                    errorMessage={errors.heroName}
                    changeHandler={handlers.heroNameChangeHandler}
                />
                <TextField name="kind"
                    label={formLabelsBG.Kind}
                    defaultValue={superhero.kind}
                    placeholder={placeholdersBG.Kind}
                    errorMessage={errors.kind}
                    changeHandler={handlers.kindChangeHandler}
                />
                <NumberField name="age"
                    label={formLabelsBG.Age}
                    defaultValue={superhero.age}
                    min="1"
                    placeholder="20"
                    errorMessage={errors.age}
                    changeHandler={handlers.ageChangeHandler}
                />
                <ImageUpload name="imageUrl"
                    label={formLabelsBG.Image}
                    defaultValue={superhero.imageUrl}
                    placeholder={placeholdersBG.Image}
                    errorMessage={errors.image}
                    changeHandler={imageHandler}
                />
                <TextareaField name="story"
                    label={formLabelsBG.Story}
                    defaultValue={superhero.story}
                    placeholder={placeholdersBG.Story}
                    errorMessage={errors.story}
                    changeHandler={handlers.storyChangeHandler}
                />
            </Form>
        </section>
    );
}

export default HeroForm;