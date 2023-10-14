import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useTheme } from '@mui/material/styles';
import {
  Drawer,
  Fab,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Slider,
  Tooltip,
  Typography
} from '@mui/material';

import {IconSettings} from '@tabler/icons-react';

import PerfectScrollbar from 'react-perfect-scrollbar';

import SubCard from '../../component/cards/SubCard';
import AnimateButton from '../../component/extended/AnimateButton';
import { SET_BORDER_RADIUS, SET_FONT_FAMILY } from '../../redux/featuresFrontend/action'
import { gridSpacing } from '../../redux/featuresFrontend/constant';
import { appDrawerWidth } from '../../redux/featuresFrontend/constant';

function valueText(value) {
  return `${value}px`;
}

const Custom = () => {
  const theme = useTheme();
  const dispatch = useDispatch()

  const custom = useSelector((state)=> state.custom)

  //open and closing of drawer

  const [open, setOpen] = useState(false);
  const handleOpenDrawer = () => {
    setOpen(!open);
  };

  const [borderRadius, setBorderRadius] = useState(custom.borderRadius)
  const handleBorderRad = (event, newBorderRadius) => {
    setBorderRadius(newBorderRadius)
  }

  useEffect(()=> {
    dispatch( {type: SET_BORDER_RADIUS, borderRadius})
  }, [dispatch, borderRadius])

  let fontInitial;
  switch(custom.fontFamily){
    case `'Inter', sans-serif`:
      fontInitial = 'Inter';
      break;
    case `'Poppins', sans-serif`:
      fontInitial = 'Poppins';
      break;
    case `'Roboto', sans-serif`:
    default:
      fontInitial = 'Roboto';
      break;
  }

  const [fontFamily, setFontFamily] = useState(fontInitial)
  useEffect(()=> {
    let newFont;
    switch(fontFamily){
        case 'Inter':
        newFont = `'Inter', sans-serif`;
        break;
      case 'Poppins':
        newFont = `'Poppins', sans-serif`;
        break;
      case 'Roboto':
      default:
        newFont = `'Roboto', sans-serif`;
        break;
    }
    dispatch({type: SET_FONT_FAMILY, fontFamily: newFont})
  },[dispatch, fontFamily])

  return(
    <>
        <Tooltip title="Customizer">
            <Fab
            component="div"
            onClick={handleOpenDrawer}
            size="medium"
            variant="circular"
            color="secondary"
            sx={{
                borderRadius: 0,
                borderTopLeftRadius: '50%',
                borderBottomLeftRadius: '50%',
                borderTopRightRadius: '50%',
                borderBottomRightRadius: '4px',
                top: '90%',
                position: 'fixed',
                right: 10,
                zIndex: theme.zIndex.speedDial
            }}
            >
                <AnimateButton>
                    <IconButton color="inherit" size="large" disableRipple>
                        <IconSettings />
                    </IconButton>
                </AnimateButton>
            </Fab>
        </Tooltip>

        <Drawer
        anchor="right"
        onClose={handleOpenDrawer}
        open={open}
        PaperProps={{
          sx: {
            width: 280
          }
        }}>
            <PerfectScrollbar>
                <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                <Typography>Customize your font and border radius!</Typography>
                
                <Grid item xs={12}>
                <SubCard title="Font Family">
                    <FormControl>
                    <RadioGroup
                        aria-label="font-family"
                        value={fontFamily}
                        onChange={(e) => setFontFamily(e.target.value)}
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel
                        value="Roboto"
                        control={<Radio />}
                        label="Roboto"
                        sx={{
                            '& .MuiSvgIcon-root': { fontSize: 28 },
                            '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
                        }}
                        />
                        <FormControlLabel
                        value="Poppins"
                        control={<Radio />}
                        label="Poppins"
                        sx={{
                            '& .MuiSvgIcon-root': { fontSize: 28 },
                            '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
                        }}
                        />
                        <FormControlLabel
                        value="Inter"
                        control={<Radio />}
                        label="Inter"
                        sx={{
                            '& .MuiSvgIcon-root': { fontSize: 28 },
                            '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
                        }}
                        />
                    </RadioGroup>
                    </FormControl>
                </SubCard>
                </Grid>
                <Grid item xs={12}>
                {/* border radius */}
                <SubCard title="Border Radius">
                    <Grid item xs={12} container spacing={2} alignItems="center" sx={{ mt: 2.5 }}>
                    <Grid item>
                        <Typography variant="h6" color="secondary">
                        4px
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Slider
                        size="small"
                        value={borderRadius}
                        onChange={handleBorderRad}
                        getAriaValueText={valueText}
                        valueLabelDisplay="on"
                        aria-labelledby="discrete-slider-small-steps"
                        marks
                        step={2}
                        min={4}
                        max={24}
                        color="secondary"
                        sx={{
                            '& .MuiSlider-valueLabel': {
                            color: 'secondary.light'
                            }
                        }}
                        />
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" color="secondary">
                        24px
                        </Typography>
                    </Grid>
                    </Grid>
                </SubCard>
                </Grid>
            </Grid>
            </PerfectScrollbar>
        </Drawer>
    </>
  )
};

export default Custom;
