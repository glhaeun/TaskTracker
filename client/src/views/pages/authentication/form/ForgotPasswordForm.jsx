import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authApi from '../../../../api/authApi';

import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';

import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from '../../../../component/extended/AnimateButton';

const ForgotPasswordForm = ({ ...others }) => {
  const theme = useTheme();
  // const navigate = useNavigate();

  const handleSubmit = async (values, { setErrors, setSubmitting, setStatus }) => {
    const { email } = values;
    try {
      console.log(email)
      await authApi.forgotPassword({username: email});

      setStatus({ success: true });
    } catch (err) {
      if (err.data && err.data.errors) {
        const errors = err.data.errors;
        const emailError = errors.find(e => e.param === 'username');
  
        setErrors({ email: '', password: '' });
  
        if (emailError) {
          setErrors({submit: emailError.msg});
        }
        setStatus({ success: false });
        setSubmitting(false);
      }
      
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          submit: null,
          email: '', // Add the 'email' field
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        })}
        onSubmit={handleSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.email || ''}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email Address / Username"
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}
            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="dark">
                <div style={{ color: "white" }}>Reset Password</div>
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ForgotPasswordForm;
