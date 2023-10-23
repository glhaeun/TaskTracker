import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import authApi from '../../../../api/authApi';
import { strengthColor, strengthIndicator } from '../../../../utils/password-strength';

import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from '../../../../component/extended/AnimateButton';

const ResetPasswordForm = ({ ...others }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [strengthConfirmPassword, setStrengthConfirmPassword] = useState(0);
  const [level, setLevel] = useState();
  const [levelConfirmPassword, setLevelConfirmPassword] = useState();


  const theme = useTheme();
  // const navigate = useNavigate();

  const {id} = useParams()
  const handleSubmit = async (values, { setErrors, setSubmitting, setStatus }) => {
    const { password, confirmPassword } = values;

    if (password !== confirmPassword) {
      setErrors({ confirmPassword: 'Password mismatch' });
      setStatus({ success: false });
      setSubmitting(false);
    } else { 
      try {
        console.log(password)
        await authApi.changePassword(id, {password: password});
        setStatus({ success: true });
      } catch (err) {
        console.log(err)
      }
    }
    
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  const changeConfirmPassword = (value) => {
    const temp = strengthIndicator(value);
    setStrengthConfirmPassword(temp);
    setLevelConfirmPassword(strengthColor(temp));
  };

  return (
    <>
      <Formik
        initialValues={{
          submit: null,
          password: '',
          confirmPassword: '',
        }}
        validationSchema={Yup.object().shape({
          password: Yup.string()
          .min(8, 'Password must be at least 8 characters')
          .max(255)
          .required('Password is required'),
          confirmPassword: Yup.string()
          .min(8, 'Confirm Password must be at least 8 characters')
          .max(255)
          .required('Confirm Password is required')
                })}
        onSubmit={handleSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
             <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? 'text' : 'password'}
                value={values.password || ''}
                name="password"
                label="Password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-register">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>

            {strength !== 0 && (
              <FormControl fullWidth>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )}

            <FormControl fullWidth error={Boolean(touched.confirmPassword && errors.confirmPassword)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-confirmPassword-register">Confirm Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-confirmPassword-register"
                type={showConfirmPassword ? 'text' : 'password'}
                value={values.confirmPassword || ''}
                name="confirmPassword"
                label="confirmPassword"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  changeConfirmPassword(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                inputProps={{}}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <FormHelperText error id="standard-weight-helper-text-password-register">
                  {errors.confirmPassword}
                </FormHelperText>
              )}
            </FormControl>

            {strengthConfirmPassword !== 0 && (
              <FormControl fullWidth>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box style={{ backgroundColor: levelConfirmPassword?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {levelConfirmPassword?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )}

            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}
            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="dark">
                  Reset Password
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ResetPasswordForm;
