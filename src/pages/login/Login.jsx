import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';

import { useFormik } from 'formik';

import { useAuthStore } from '../../hooks/useAuthStore';
import { useNavigate } from 'react-router-dom';

const validate = ({ username, pass }) => {
  const errors = {};
  if (!username) {
    errors.username = "Ingrese su usuario";
  }
  if (!pass) {
    errors.pass = "Ingrese la contraseña";
  }
  return errors;
};

export const Login = () => {
  const navigate = useNavigate();
  const { starLogin, uid  } = useAuthStore();

  const [touched, setTouched] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      pass: "",
    },
    validateOnBlur: false,
    validate,
    onSubmit: async ({ username, pass }) => {
      await starLogin({ username, pass });
    },
  });

  useEffect(() => {
    if ( !uid ) return;
    navigate('/');
  }, [uid]);
  
  return (
    <>
      <Box
        component="img"
        sx={{
          height: 394,
          width: 434,
          marginTop: 10,
          mb: 10,
        }}
        alt="The house from the offer."
        src="../src/assets/homeBanner.svg"
      />
      <Box
        sx={{ mt: 2, mb: 2, display: "block" }}
        component="form"
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <TextField
          id="username"
          sx={{ mt: 2, mb: 1 }}
          placeholder="Ingrese su usuario"
          fullWidth
          autoFocus
          helperText={
            formik.errors.username && touched && `${formik.errors.username}`
          }
          onChange={formik.handleChange}
          error={formik.errors.username && touched}
          value={formik.values.username}
          onBlur={() => setTouched(true)}
        />
        <TextField
          id="pass"
          fullWidth
          sx={{ mt: 2, mb: 1 }}
          placeholder="Ingrese su contraseña"
          autoFocus
          helperText={formik.errors.pass && touched && `${formik.errors.pass}`}
          onChange={formik.handleChange}
          error={formik.errors.pass && touched}
          value={formik.values.pass}
          onBlur={() => setTouched(true)}
        />

        <Button
          fullWidth
          xs={{ mt: 2 }}
          onClick={formik.handleSubmit}
          disabled={!!formik.errors.first && !!formik.errors.second}
        >
          Enviar
        </Button>
      </Box>
    </>
  );
};
