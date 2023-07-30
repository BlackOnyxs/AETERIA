import React, { useRef, useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Typography, CircularProgress, Select, FormControl, InputLabel, MenuItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material/';
import { useFormik } from 'formik';
import { Check, UploadFile } from '@mui/icons-material';
import Swal from 'sweetalert2';

import { fileUpload } from '../../helpers/fileUpload';
import { useResourceStore, useAuthStore, useUiStore } from '../../hooks';


const validate = ({ title }) => {
    const errors = {};
    if (!title) {
        errors.title = "Ingrese el titulo";
    } else if (title.length === 0) {
        errors.title = "Ingrese el titulo";
    }
    return errors;
};

export const VideoModal = () => {
    const { toggleVideoModal, toggleUploadFile, isUpdloadingFile, isVideoModalOpen } = useUiStore();
    const { activeResource, saveResource, isSaving } = useResourceStore();
    const { uid } = useAuthStore();

    const [touched, setTouched] = useState(false);
    const [url, seturl] = useState('');
    const [miniUrl, setMiniUrl] = useState('');

    const uploadRef = useRef();
    const miniRef = useRef();

    const formik = useFormik({
        initialValues: {
            title: activeResource ? activeResource.title : '',
        },
        validateOnBlur: false,
        validate,
        onSubmit: async ({ title }) => {
            saveResource({ ...activeResource, title, url, uid, type: 'videos', mini: miniUrl });
            toggleVideoModal();
        },
    });

    const onFilesSelected = async ({ target }) => {
        if (!target.files || target.files.length === 0) {
            return;
        }
        toggleUploadFile();
        try {
            for (const file of target.files) {
                console.log(file);
                if (file.size > 99000000) {
                    toggleVideoModal();
                    toggleUploadFile();
                    Swal.fire({
                        title: "Error",
                        text: 'Tu plan solo te permite subir archivos inferiores a 100MB',
                        icon: "error",
                    }).then(() => {
                        toggleVideoModal();
                    })
                    return;
                }
                
                const resp = await fileUpload(file);
                if (resp.url) {
                    toggleUploadFile();
                    if ( file.type === 'video/mp4') {
                        seturl(resp.secure_url);
                    } else {
                        setMiniUrl(resp.secure_url)
                    }
                    formik.resetForm();
                }
            }
        } catch (error) {
            toggleUploadFile();
            console.log({ error });
        }
    }

    useEffect(() => {

    }, [activeResource])

    useEffect(() => {
    }, [isUpdloadingFile])
    useEffect(() => {
    }, [url]);

    return (
        <div>
            <Modal

                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    border: "2px solid #000",
                    boxShadow: 24,
                    p: 4,
                }}
                open={ isVideoModalOpen }
                onClose={toggleVideoModal}
            // onClose
            >

                <Box
                    sx={{ mt: 2, mb: 2, display: "block" }}
                    component="form"
                    autoComplete="off"
                    onSubmit={formik.handleSubmit}
                >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Nuevo Video
                    </Typography>

                    <TextField
                        id="title"
                        sx={{ mt: 2, mb: 1 }}
                        placeholder="Ingrese un titulo"
                        fullWidth
                        autoFocus
                        helperText={
                            formik.errors.title && touched && `${formik.errors.title}`
                        }
                        onChange={formik.handleChange}
                        error={formik.errors.title && touched}
                        value={formik.values.title}
                        onBlur={() => setTouched(true)}
                    />

                    <Button
                        sx={{ display: (url ? 'none' : 'flex') }}
                        onClick={() => uploadRef.current?.click()}
                        startIcon={<UploadFile />}
                        disabled={ isUpdloadingFile }
                    >
                        Seleccionar archivo
                    </Button>

                    <CircularProgress
                        color='warning'
                        sx={{ display: (isUpdloadingFile ? 'flex' : 'none') }}
                    />

                    <ListItemButton
                        disabled
                        sx={{ display: (url ? 'flex' : 'none') }}
                    >
                        <ListItemIcon>
                            <Check color='secondary' />
                        </ListItemIcon>
                        <ListItemText primary='Video subido' />
                    </ListItemButton>


                    <input
                        ref={uploadRef}
                        type="file"
                        multiple
                        accept='video/mp4'
                        style={{ display: 'none' }}

                        onChange={onFilesSelected}
                    />

                    <Button
                        sx={{ display: (miniUrl ? 'none' : 'flex') }}
                        onClick={() => miniRef.current?.click()}
                        startIcon={<UploadFile />}
                        disabled={ !url || isUpdloadingFile }
                    >
                        Subir miniatura
                    </Button>
                    <Box
                        component='img'
                        width={100}
                        height={100}
                        src={miniUrl}
                        sx={{ display: (miniUrl ? 'flex' : 'none') }}
                    />

                    <input
                        ref={miniRef}
                        type="file"
                        multiple
                        accept='image/png, image/gif, image/jpeg, image/svg '
                        style={{ display: 'none' }}

                        onChange={onFilesSelected}
                    />


                    <Button
                        fullWidth
                        xs={{ mt: 2 }}
                        onClick={formik.handleSubmit}
                        disabled={(!!formik.errors.first && !!formik.errors.second) && isUpdloadingFile || isSaving}
                    >
                        Enviar
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};
