import { useRoutes } from 'react-router-dom';

// routes
import AuthenticationRoutes from './AuthenticationRoutes';
import AppRoutes from './AppRoutes';


// ==============================|| ROUTING RENDER ||============================== //

function Routes() {
  return useRoutes([AppRoutes, AuthenticationRoutes]);
}

export default Routes
