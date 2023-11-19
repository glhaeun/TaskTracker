import { Button, Box } from '@mui/material';
import errorImg from './img/error.svg';
import { Link } from 'react-router-dom';

 const ErrorPage = () => {

  return (
    <>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
          <img src={errorImg} alt='errorimg' />
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <h1 style={{
                color: 'var(--white-color)',
                margin: '3rem 0 2rem 0',
                fontSize: '2rem'
            }}>You've found a page that doesn't exist</h1>
            <Link to = '/'>
              <Button>Back to safe page</Button> 
            </Link>             
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ErrorPage;
