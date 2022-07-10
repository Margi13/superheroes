import Form from '../Form';
import { useState } from 'react';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import * as comicsService from '../../../services/comicsService';
import * as firebaseService from '../../../services/firebaseService';
import * as documentService from '../../../services/documentService';
import useComicsState from '../../../hooks/useComicsState';
import { useAuthContext } from '../../../contexts/AuthContext';

import { formLabelsBG, placeholdersBG } from '../../../common/labelsConstatnsBG';
import { alertMessages } from '../../../common/messagesConstantsBG';
import { typesColor, useNotificationContext } from '../../../contexts/NotificationContext';
import { ChangeHandlers } from '../Validation/ComicsValidationHelper';
import TextField from '../Fields/TextField';
import ImagesBulkUpload from '../Uploads/ImagesBulkUpload';
import TextareaField from '../Fields/TextareaField';

const initialErrorState = { title: null, genre: null, description: null, images: null }

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
            .then((result) => {
                if (result.type) {
                    console.log(result.message);
                    throw new Error(result.message);
                }
                const data = {
                    images: images, type: 'comics', folderName: result._id
                }
                firebaseService.handleMultipleImagesUpload(data, setImages, () => { });
                const document = {
                    dataId: result._id,
                    dataType: "comics"
                }
                documentService.createCopyright(document)
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
                firebaseService.handleMultipleImagesUpload(data, setImages, () => { });
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
                    placeholder={placeholdersBG.Title}
                    errorMessage={errors.title}
                    changeHandler={handlers.titleChangeHandler}
                />
                <TextField name="genre"
                    label={formLabelsBG.Genre}
                    defaultValue={comics.genre}
                    placeholder={placeholdersBG.Genre}
                    errorMessage={errors.genre}
                    changeHandler={handlers.genreChangeHandler}
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