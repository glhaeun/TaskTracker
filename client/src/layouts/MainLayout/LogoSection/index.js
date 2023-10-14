import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ButtonBase } from '@mui/material';

import config from '../../../config';
import Logo from '../../../component/Logo';
import { MENU_OPEN } from '../../../redux/featuresFrontend/action';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  const defaultId = useSelector((state) => state.custom.defaultId);
  const dispatch = useDispatch();
  return (
    <ButtonBase disableRipple onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })} component={Link} to={config.defaultPath}>
      <Logo />
    </ButtonBase>
  );
};

export default LogoSection;
