import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Picker as EmojiPicker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'

const SavePalettePopupForm = props => {
  const {
    classes,
    colors,
    palettes,
    savePalette,
    setErrorMessage,
    setOpenSnackbar,
    history,
    hideForm,
  } = props
  const [newPaletteName, setNewPaletteName] = useState('')
  const [stage, setStage] = useState('form')

  const handleChangeNewPaletteName = e => {
    setNewPaletteName(e.target.value)
  }

  const showEmojiPicker = e => {
    e.preventDefault()
    setStage('emoji')
  }

  const handleSavePalette = emoji => {
    let newPName = newPaletteName
    const isPaletteNameUnique = palettes.every(
      ({ paletteName }) => paletteName.toLowerCase() !== newPName.toLowerCase(),
    )

    if (isPaletteNameUnique) {
      const newPalette = {
        paletteName: newPName,
        id: newPName.toLowerCase().replace(/ /g, '-'),
        colors: colors,
        emoji: emoji.native,
      }
      savePalette(newPalette)
      history.push('/')
    } else {
      setErrorMessage('Palette name is not unique')
      setOpenSnackbar(true)
    }
  }

  return (
    <>
      <Dialog open={stage === 'emoji'} onClose={hideForm} aria-labelledby="chooseEmoji">
        <DialogTitle id="chooseEmoji">Choose an Emoji.</DialogTitle>
        <DialogContent>
          <DialogContentText>Please select one from Emojis below.</DialogContentText>
          <EmojiPicker onSelect={handleSavePalette} title="Choose an Emoji" />
        </DialogContent>
      </Dialog>

      <Dialog open={stage === 'form'} onClose={hideForm} aria-labelledby="chooseName">
        <DialogTitle id="chooseName">Choose a Palette Name</DialogTitle>
        <form autoComplete="off" onSubmit={showEmojiPicker} name="newPaletteName">
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new palette. Make sure its unique.
            </DialogContentText>
            <TextField
              id="newPaletteName"
              label="palette name"
              className={classes.textField}
              value={newPaletteName}
              onChange={handleChangeNewPaletteName}
              margin="normal"
              fullWidth
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={hideForm} color="primary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save Palette
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default SavePalettePopupForm
