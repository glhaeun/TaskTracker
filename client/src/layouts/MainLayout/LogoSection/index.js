import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { ButtonBase } from '@mui/material';

import Logo from '../../../component/Logo';
import config from '../../../config';
import { MENU_OPEN } from '../../../redux/featuresCustom/action';

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
