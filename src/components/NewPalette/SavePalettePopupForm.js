import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const SavePalettePopupForm = props => {
  const { classes, colors, palettes, savePalette, setErrorMessage, setOpenSnackbar, history } = props
  const [open, setOpen] = useState(false)
  const [newPaletteName, setNewPaletteName] = useState('')

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

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
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default SavePalettePopupForm
