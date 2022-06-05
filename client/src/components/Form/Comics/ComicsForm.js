import Form from '../Form';
import { useState } from 'react';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import * as comicsService from '../../../services/comicsService';
import * as imageService from '../../../services/imageService';
import useComicsState from '../../../hooks/useComicsState';
import { useAuthContext } from '../../../contexts/AuthContext';

import { formLabelsBG, placeholdersBG } from '../../../common/labelsConstatnsBG';
import { alertMessages } from '../../../common/messagesConstantsBG';
import { typesColor, useNotificationContext } from '../../../contexts/NotificationContext';
import { ChangeHandlers } from '../../Common/Validation/HeroValidationHelper';
import TextField from '../Fields/TextField';
import ImageUpload from '../Fields/ImageUploadField';
import TextareaField from '../Fields/TextareaField';

const initialErrorState = { personName: null, heroName: null, kind: null, age: null, image: null, story: null }

const ComicsForm = ({
    type
}) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { addNotification } = useNotificationContext();
    const { user } = useAuthContext();
    const [image, setImage] = useState({ image: null, url: '' });
    const [errors, setErrors] = useState(initialErrorState);
    const [comics] = useComicsState(id);

    if (comics._ownerId && user._id !== comics._ownerId) {
        return <Navigate to="/"/>
    }

    const handlers = ChangeHandlers(setErrors, setImage);

    const imageHandler = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0]
            setImage(() => ({ file }));
        }
    }

    const create = (comicsData, image) => {
        comicsService.create(comicsData, image)
            .then(() => {
                imageService.handleImageUpload(image);
                addNotification(alertMessages.CreateSuccess, typesColor.success);
                navigate('/');
            })
            .catch(error => {
                addNotification(alertMessages.CreateDenied, typesColor.error);
                console.log(error);
            });
    }
    const edit = (id, comicsData) => {
        comicsService.update(id, comicsData)
            .then(() => {
                imageService.handleImageUpload(image.img);
                addNotification(alertMessages.EditSuccess, typesColor.success);
                navigate(`/details/${id}`)
            })
            .catch(error => {
                addNotification(alertMessages.EditDenied, typesColor.error);
                console.log(error);
            })
    }
    const checkForError = (comicsData) => {
        if (comicsData.personName === '' || comicsData.heroName === '' || comicsData.kind === '' || !comicsData.age || comicsData.image === '' || comicsData.story === '') {
            addNotification(alertMessages.EnteredNoData, typesColor.error);
            return;
        }
        if (errors.personName || errors.heroName || errors.kind || errors.age || errors.image || errors.story) {
            addNotification(alertMessages.EnteredInvalidData, typesColor.error);
            return;
        }
    }
    const onComicsCreate = async (e) => {
        e.preventDefault();

        let comicsData = Object.fromEntries(new FormData(e.currentTarget));
        checkForError(comicsData);

        comicsData.imageUrl = image.file ? image.file.name : comics.imageUrl;

        if (type === 'create') {
            create(comicsData, image.file);
        } else {
            edit(comics.id, comicsData);
        }
    }
    return (
        <section id={type + "-page"} className="auth">
            <Form onSubmit={onComicsCreate} type={type}>
                <TextField name="title"
                    label={formLabelsBG.Title}
                    defaultValue={comics.title}
                    placeholder={placeholdersBG.ComicsTitle}
                    errorMessage={errors.title}
                    changeHandler={handlers.personNameChangeHandler}
                />
                <ImageUpload name="coverPage"
                    label={formLabelsBG.CoverPage}
                    defaultValue={comics.coverPage}
                    placeholder={placeholdersBG.Image}
                    errorMessage={errors.image}
                    changeHandler={imageHandler}
                />
                <TextareaField name="description"
                    label={formLabelsBG.Description}
                    defaultValue={comics.description}
                    placeholder={placeholdersBG.Description}
                    errorMessage={errors.description}
                    changeHandler={handlers.storyChangeHandler}
                />
            </Form>
        </section>
    );
}

export default ComicsForm;