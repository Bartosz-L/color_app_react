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
import DraggableColorList from './DraggableColorList'
import ErrorSnackbar from '../Snackbar/Snackbar'
import arrayMove from 'array-move'

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
  },
}))

const NewPaletteForm = props => {
  const {
    routerProps: { history },
    savePalette,
    palettes,
    maxColors,
  } = props

  const paletteIsFull = colors.length >= maxColors
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const [currentColor, setCurrentColor] = useAsyncState('teal')
  const [colors, setColors] = useAsyncState(palettes[0].colors)
  const [newColorName, setNewColorName] = useAsyncState('')
  const [newPaletteName, setNewPaletteName] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleAddNewColor = async e => {
    e.preventDefault()
    const newColor = {
      color: currentColor,
      name: newColorName,
    }

    const isColorNameUnique = colors.every(
      ({ name }) => name.toLowerCase() !== newColor.name.toLowerCase(),
    )
    const isColorUnique = colors.every(({ color }) => color !== newColor.color)

    if (isColorNameUnique && isColorUnique) {
      await setColors([...colors, newColor])
      await setNewColorName('')
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
    setNewColorName(e.target.value)
  }

  const handleChangeNewPaletteName = e => {
    setNewPaletteName(e.target.value)
  }

  const handleCloseSnackBar = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
  }

  const handleRemoveBox = colorName => {
    setColors(colors.filter(color => color.name !== colorName))
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

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors(arrayMove(colors, oldIndex, newIndex))
  }

  const clearColors = () => {
    setColors([])
  }

  const addRandomColor = () => {
    // pick random color from existing palettes
    const allColors = palettes.map(p => p.colors).flat()
    let randomNumber = Math.floor(Math.random() * allColors.length)
    const randomColor = allColors[randomNumber]

    setColors([...colors, randomColor])
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
          <Button variant="contained" color="secondary" onClick={clearColors}>
            Clear Palette
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={addRandomColor}
            disabled={paletteIsFull}
          >
            Random Color
          </Button>
        </div>

        <ChromePicker
          color={currentColor}
          onChangeComplete={newColor => setCurrentColor(newColor.hex)}
        />

        <form autoComplete="off" onSubmit={handleAddNewColor} name="newColorName">
          <TextField
            id="newColorName"
            label="color name"
            className={classes.textField}
            value={newColorName}
            onChange={handleChangeNewName}
            margin="normal"
            required
          />
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: paletteIsFull ? 'grey' : currentColor }}
            type="submit"
            size="small"
            disabled={paletteIsFull}
          >
            {paletteIsFull ? 'Palette Full' : 'Add Color'}
          </Button>
        </form>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList
          colors={colors}
          handleRemoveBox={handleRemoveBox}
          axis="xy"
          onSortEnd={onSortEnd}
        />
        <ErrorSnackbar
          open={openSnackbar}
          handleCloseSnackBar={handleCloseSnackBar}
          message={errorMessage}
        />
      </main>
    </div>
  )
}

NewPaletteForm.defaultProps = {
  maxColors: 20,
}

export default NewPaletteForm
