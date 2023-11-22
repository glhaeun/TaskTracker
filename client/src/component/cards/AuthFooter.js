// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
  <Stack direction="row" justifyContent="space-between">
    <Typography variant="subtitle2" component={Link} href="https://localhost:3000" target="_blank" underline="hover">
      TaskTracker
    </Typography>
    <Typography variant="subtitle2" underline="hover">
      &copy; Kelompok 2
    </Typography>
  </Stack>
);

export default AuthFooter;
