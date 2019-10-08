import { makeStyles } from '@material-ui/core/styles'

import { drawerWidth } from './globalVariavles.styles'
import sizes from './sizes'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '64px',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  navButtons: {
    marginRight: theme.spacing(1),
    '& a': {
      textDecoration: 'none',
      [sizes.down('xs')]: {
        marginRight: '0.5rem',
      },
    },
    [sizes.down('xs')]: {
      marginRight: '0.5rem',
    },
  },
  button: {
    margin: '0 0.5rem',
    [sizes.down('xs')]: {
      margin: '0',
      padding: '0',
    },
  },
}))

export default useStyles
