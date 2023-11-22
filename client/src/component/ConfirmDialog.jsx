import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles'
import { IconExclamationCircle } from '@tabler/icons-react';
import React from 'react'

const useStyles = makeStyles(() => ({
    dialog: {
        position: 'absolute',
        width: '250px',
    },
    dialogTitle: {
        textAlign: 'center'
    },
    dialogContent: {
        textAlign: 'center'
    },
    dialogAction: {
        justifyContent: 'center'
    },
    titleIcon: {
        backgroundColor: '#f3e5f5',
        color: '#f44336',
        '&:hover': {
            backgroundColor: '#f3e5f5',
            cursor: 'default',
        },
        '& .MuiSVGIcon-root': {
            fontSize: '8rem'
        }

    }
}))
const ConfirmDialog = (props) => {
  const classes = useStyles();

  const { confirmDialog, setConfirmDialog} = props
  return (
    <Dialog open={confirmDialog.isOpen} classes={{paper: classes.dialog}}>
        <DialogTitle className={classes.dialogTitle}>
            <IconButton disableRipple className={classes.titleIcon}>
                <IconExclamationCircle />
            </IconButton>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
            <Typography variant='h4'>{confirmDialog.title}</Typography>
            <Typography variant='subtitle2'>{confirmDialog.subtitle}</Typography>
        </DialogContent>
        <DialogActions className={classes.dialogAction}>
            <Button
            onClick={()=> {
                setConfirmDialog({...confirmDialog, isOpen: false})
            }}
            >No</Button>
            <Button
            onClick={confirmDialog.onConfirm}
            >Yes</Button>
        </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog