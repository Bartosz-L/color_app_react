import sizes from './sizes'
import svgBackground from './Quantum-Gradient.svg'

export default {
  '@global': {
    '.fade-exit': {
      opacity: 1,
    },
    '.fade-exit-active': {
      opacity: 0,
      transition: 'opacity 300ms ease-out',
    },
  },
  root: {
    height: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#ff0000',
    backgroundImage: `url(${svgBackground})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    /* background by SVGBackgrounds.com */
    overflowY: 'scroll',
  },
  container: {
    width: '70%',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'wrap',
    [sizes.down('xl')]: {
      width: '80%',
    },
  },
  nav: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    color: 'white',
    alignItems: 'center',
    '& a': {
      textDecoration: 'none',
      color: 'white',
      fontWeight: 'bold',
      '&:hover': {
        color: 'rgba(0,0,0, 0.5)',
      },
    },
  },
  palettes: {
    boxSizing: 'border-box',
    width: '100%',
    marginBottom: '1.5rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 30%)',
    gridGap: '2.5rem',
    [sizes.down('md')]: {
      gridTemplateColumns: 'repeat(2, 50%)',
      gridGap: '1.5rem',
    },
    [sizes.down('xs')]: {
      gridTemplateColumns: 'repeat(1, 100%)',
      gridGap: '1.4rem',
    },
  },
}
