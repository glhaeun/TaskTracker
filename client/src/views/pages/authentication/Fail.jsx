import { Link} from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthWrapper1 from './styling/Wrapper';
import AuthCardWrapper from './styling/CardWrapper';
import Logo from '../../../component/Logo';
import AuthFooter from '../../../component/cards/AuthFooter';
import AnimateButton from '../../../component/extended/AnimateButton';


const Fail = ({error}) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  
  console.log(error)

  return (
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
                            Failed to verify
                          </Typography>
                          <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
                            {error.message}
                          </Typography>
                          <AnimateButton>
                                <Button disableElevation fullWidth size="large" variant="contained" color="dark" component={Link} to="/login" >
                                Back to Login
                                </Button>
                            </AnimateButton>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </AuthCardWrapper>

  );
};

export default Fail;
