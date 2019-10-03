import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  TextField,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

const drawerWidth = 400
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
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  navButtons: {},
}))

const PaletteFormNav = props => {
  const classes = useStyles()
  const {
    colors,
    palettes,
    open,
    handleDrawerOpen,
    savePalette,
    setErrorMessage,
    setOpenSnackbar,
    history,
  } = props
  const [newPaletteName, setNewPaletteName] = useState('')

  const handleChangeNewPaletteName = e => {
    setNewPaletteName(e.target.value)
  }

  const handleSavePalette = e => {
    e.preventDefault()
    let newPName = newPaletteName
    const isPaletteNameUnique = palettes.every(
      ({ paletteName }) => paletteName.toLowerCase() !== newPName.toLowerCase(),
    )

    if (isPaletteNameUnique) {
      const newPalette = {
        paletteName: newPName,
        id: newPName.toLowerCase().replace(/ /g, '-'),
        colors: colors,
      }
      savePalette(newPalette)
      history.push('/')
    } else {
      setErrorMessage('Palette name is not unique')
      setOpenSnackbar(true)
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        color="default"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Create A Palette
          </Typography>
        </Toolbar>
        <div className={classes.navButtons}>
          <form autoComplete="off" onSubmit={handleSavePalette} name="newPaletteName">
            <TextField
              id="newPaletteName"
              label="palette name"
              className={classes.textField}
              value={newPaletteName}
              onChange={handleChangeNewPaletteName}
              margin="normal"
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Save Palette
            </Button>
          </form>
          <Link to="/">
            <Button type="button" variant="contained" color="secondary">
              Go Back
            </Button>
          </Link>
        </div>
      </AppBar>
    </div>
  )
}

export default PaletteFormNav
