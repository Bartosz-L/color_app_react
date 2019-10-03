import React, { useState } from 'react'
import useAsyncState from '../../utils/useAsyncState'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Drawer, Typography, Divider, IconButton, Button } from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import DraggableColorList from './DraggableColorList'
import ErrorSnackbar from '../Snackbar/Snackbar'
import arrayMove from 'array-move'
import PaletteFormNav from './PaletteFormNav'
import ColorPicker from './ColorPicker'

const drawerWidth = 400

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
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
}))

const NewPaletteForm = props => {
  const {
    routerProps: { history },
    savePalette,
    palettes,
    maxColors,
  } = props

  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [colors, setColors] = useAsyncState(palettes[0].colors)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const paletteIsFull = colors.length >= maxColors

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
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
      <PaletteFormNav
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        palettes={palettes}
        colors={colors}
        savePalette={savePalette}
        setErrorMessage={setErrorMessage}
        setOpenSnackbar={setOpenSnackbar}
        history={history}
      />
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
            <ChevronLeftIcon />
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

        <ColorPicker
          paletteIsFull={paletteIsFull}
          colors={colors}
          setErrorMessage={setErrorMessage}
          setOpenSnackbar={setOpenSnackbar}
          setColors={setColors}
          classes={classes}
        />
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