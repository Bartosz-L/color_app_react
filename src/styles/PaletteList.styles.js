import { white } from 'ansi-colors'

export default {
  root: {
    backgroundColor: 'white',
    height: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  container: {
    width: '70%',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  nav: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    color: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    '& a': {
      textDecoration: 'none',
      color: 'rgba(0,0,0,0.5)',
    },
  },
  palettes: {
    boxSizing: 'border-box',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 30%)',
    gridGap: '5%',
  },
}
