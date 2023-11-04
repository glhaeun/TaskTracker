import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import authApi from '../../../api/authApi';
import Loading from './styling/Loading';
import { Link} from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthWrapper1 from './styling/Wrapper';
import AuthCardWrapper from './styling/CardWrapper';
import AuthLogin from './form/ResetPasswordForm';
import Logo from '../../../component/Logo';
import AuthFooter from '../../../component/cards/AuthFooter';
import Fail from './Fail';



const ChangePassword = () => {
  const {id, uniqueString} = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState([])

  useEffect(() => {
    authApi.getUserForChangePassword(id, uniqueString)
      .then((data) => {
        console.log("hi")
        console.log(data)
        if (data.status !== 'success' || data.status === undefined) {
          setError(true); 
          setErrorMessage(data)
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("hi")
        console.error('Error:', error);
        setErrorMessage(data)
        setError(true); // Set error state to true
        setLoading(false);
      });

  },  [id, uniqueString, navigate]); 

  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <AuthWrapper1>
    <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
          <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
            {loading ? ( // Display a loading indicator
            <Loading></Loading>
          ) : error ? ( // Display an error message
           <Fail error={errorMessage}></Fail>
          ) : ( // Display your "Change Password" content
            <AuthCardWrapper>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item sx={{ mb: 3 }}>
                <Link to="#">
                  <Logo />
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                  <Grid item>
                    <Stack alignItems="center" justifyContent="center" spacing={1}>
                      <Typography color={theme.palette.grey[900]} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                      Reset your password
                      </Typography>
                      <Typography variant="caption" fontSize="16px" textAlign={'center'}>
                      Type in your new password
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <AuthLogin />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Grid item container direction="column" alignItems="center" xs={12}>
                  <Typography component={Link} to="/login" variant="subtitle1" sx={{ textDecoration: 'none' }}>
                    Already have an account?
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </AuthCardWrapper>
          )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
        <AuthFooter />
      </Grid>
    </Grid>
  </AuthWrapper1>
  );
}

export default ChangePassword;
