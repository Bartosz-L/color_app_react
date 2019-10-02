import React, { useState } from 'react'
import { ChromePicker } from 'react-color'
import useAsyncState from '../../utils/useAsyncState'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  IconButton,
  Button,
  TextField,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import DraggableColorBox from './DraggableColorBox'
import ErrorSnackbar from '../Snackbar/Snackbar'

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
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}))

const NewPaletteForm = props => {
  const {
    routerProps: { history },
    savePalette,
  } = props
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const [currentColor, setCurrentColor] = useAsyncState('teal')
  const [colors, setColors] = useAsyncState([{ color: 'blue', name: 'blue' }])
  const [newName, setNewName] = useAsyncState('')
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleAddNewColor = async e => {
    e.preventDefault()
    const newColor = {
      color: currentColor,
      name: newName,
    }

    const isColorNameUnique = colors.every(
      ({ name }) => name.toLowerCase() !== newColor.name.toLowerCase(),
    )
    const isColorUnique = colors.every(({ color }) => color !== newColor.color)

    if (isColorNameUnique && isColorUnique) {
      await setColors([...colors, newColor])
      await setNewName('')
    } else if (!isColorNameUnique) {
      setErrorMessage('Name is not unique')
      setOpenSnackbar(true)
    } else if (!isColorUnique) {
      setErrorMessage('Color is already taken')
      setOpenSnackbar(true)
    }
  }

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleChangeNewName = e => {
    setNewName(e.target.value)
  }

  const handleCloseSnackBar = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
  }

  const handleSavePalette = () => {
    let newPaletteName = 'New Test Palette'
    const newPalette = {
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g, '-'),
      colors: colors,
    }
    savePalette(newPalette)
    history.push('/')
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
            Persistent drawer
          </Typography>
          <Button variant="contained" color="primary" onClick={handleSavePalette}>
            Save Palette
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />

        <Typography variant="h4">Design Your Palette</Typography>

        <div>
          <Button variant="contained" color="secondary">
            Clear Palette
          </Button>
          <Button variant="contained" color="primary">
            Random Color
          </Button>
        </div>

        <ChromePicker
          color={currentColor}
          onChangeComplete={newColor => setCurrentColor(newColor.hex)}
        />

        <form className={classes.container} autoComplete="off" onSubmit={handleAddNewColor}>
          <TextField
            id="standard-name"
            label="color name"
            className={classes.textField}
            value={newName}
            onChange={handleChangeNewName}
            margin="normal"
            required
          />
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: currentColor }}
            type="submit"
          >
            Add Color
          </Button>
        </form>
        <ErrorSnackbar
          open={openSnackbar}
          handleCloseSnackBar={handleCloseSnackBar}
          message={errorMessage}
        />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {colors.map(color => (
          <DraggableColorBox color={color.color} name={color.name} key={color.color} />
        ))}
      </main>
    </div>
  )
}

export default NewPaletteForm
