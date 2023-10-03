import { useRoutes } from 'react-router-dom';

// routes
import AuthenticationRoutes from './AuthenticationRoutes';

// ==============================|| ROUTING RENDER ||============================== //

function Routes() {
  return useRoutes([AuthenticationRoutes]);
}

export default Routes
