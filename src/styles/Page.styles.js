import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  '@global': {
    '.page-enter': {
      transform: 'translateX(100%)',
    },
    '.page-enter-active': {
      transform: 'translateX(0)',
    },
    '.page-exit-active': {
      transform: 'translateX(-100%)',
    },
  },
  page: {
    height: '100vh',
    width: '100%',
    position: 'fixed',
    top: '0',
    transition: 'transform 300ms ease-in-out',
  },
}))

export default useStyles
