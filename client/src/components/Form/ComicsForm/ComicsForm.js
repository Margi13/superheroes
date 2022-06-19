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
import { ChangeHandlers } from '../../Common/Validation/ComicsValidationHelper';
import TextField from '../Fields/TextField';
import ImagesBulkUpload from '../Uploads/ImagesBulkUpload';
import TextareaField from '../Fields/TextareaField';

const initialErrorState = { title: null, description: null, images: null }

const ComicsForm = ({
    type
}) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { addNotification } = useNotificationContext();
    const { user } = useAuthContext();
    const [images, setImages] = useState({ images: null, urls: '' });
    const [errors, setErrors] = useState(initialErrorState);
    const [comics] = useComicsState(id);

    if (comics._ownerId && user._id !== comics._ownerId) {
        return <Navigate to="/" />
    }

    const handlers = ChangeHandlers(setErrors, setImages);

    const imageHandler = (e) => {
        if (e.target.files) {
            const files = e.target.files;
            setImages(() => ({ files }));
        }
    }

    const create = (comicsData, images) => {
        comicsService.create(comicsData, images)
            .then((res) => {
                const data = {
                    images: images, type: 'comics', folderName: res._id
                }
                imageService.handleMultipleImagesUpload(data, setImages, () => { });
                addNotification(alertMessages.CreateSuccess, typesColor.success);
                navigate('/');
            })
            .catch(error => {
                addNotification(alertMessages.CreateDenied, typesColor.error);
                console.log(error);
            });
    }
    const edit = (id, comicsData, images) => {
        comicsService.update(id, { data: comicsData })
            .then(() => {
                const data = {
                    images: images, type: 'comics', folderName: id
                }
                imageService.handleMultipleImagesUpload(data, setImages, () => { });
                addNotification(alertMessages.EditSuccess, typesColor.success);
                navigate(`/details/comics/${id}`)
            })
            .catch(error => {
                addNotification(alertMessages.EditDenied, typesColor.error);
                console.log(error);
            })
    }
    const checkForError = (comicsData) => {
        if (comicsData.title === '' || comicsData.description === '' || comicsData.images === '') {
            addNotification(alertMessages.EnteredNoData, typesColor.error);
            return 0;
        }
        if (errors.title || errors.description || errors.images) {
            addNotification(alertMessages.EnteredInvalidData, typesColor.error);
            return 0;
        }
        return 1;
    }
    const onComicsCreate = async (e) => {
        e.preventDefault();

        let comicsData = Object.fromEntries(new FormData(e.currentTarget));
        const isValid = checkForError(comicsData);
        comicsData.imagesUrl = images.files ? Object.keys(images.files).map(i => images.files[i].name) : comics.imagesUrl;

        if (isValid && type === 'create') {
            create(comicsData, images.files);
        } else if (isValid && type === 'edit') {
            edit(comics._id, comicsData, images.files);
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
                    changeHandler={handlers.titleChangeHandler}
                />
                <ImagesBulkUpload name="imagesUrl"
                    label={formLabelsBG.CoverPage}
                    defaultValue={comics.imagesUrl}
                    placeholder={placeholdersBG.Image}
                    errorMessage={errors.images}
                    changeHandler={imageHandler}
                />
                <TextareaField name="description"
                    label={formLabelsBG.Description}
                    defaultValue={comics.description}
                    placeholder={placeholdersBG.Description}
                    errorMessage={errors.description}
                    changeHandler={handlers.descriptionChangeHandler}
                />
            </Form>
        </section>
    );
}

export default ComicsForm;