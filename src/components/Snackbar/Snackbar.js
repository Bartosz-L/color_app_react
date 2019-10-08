import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import ErrorIcon from '@material-ui/icons/Error'
import clsx from 'clsx'
import React from 'react'

const useStyles = makeStyles(theme => ({
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  snackbarMargin: {
    margin: theme.spacing(1),
  },
}))

const ErrorSnackbar = props => {
  const classes = useStyles()

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={props.open}
        autoHideDuration={6000}
        onClose={props.handleCloseSnackBar}
      >
        <SnackbarContent
          className={classes.error}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              <ErrorIcon className={clsx(classes.icon, classes.iconVariant)} />
              {props.message}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={props.handleCloseSnackBar}
            >
              <CloseIcon className={classes.icon} />
            </IconButton>,
          ]}
        />
      </Snackbar>
    </div>
  )
}

export default ErrorSnackbar
