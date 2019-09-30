import React from 'react'
import Slider from 'rc-slider'
import { Select, MenuItem, Snackbar, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import 'rc-slider/assets/index.css'
import './Navbar.scss'
import useAsyncState from '../../utils/useAsyncState'

const Navbar = props => {
  const [colorFormat, setColorFormat] = useAsyncState('hex')
  const [openSnackbar, setOpenSnackbar] = useAsyncState(false)

  const { level, changeLevel, changeColorFormat } = props

  const handleFormatChange = async e => {
    const newColorFormat = await setColorFormat(e.target.value)
    changeColorFormat(newColorFormat)
    setOpenSnackbar(true)
  }

  const closeSnackbar = () => {
    setOpenSnackbar(false)
  }

  return (
    <header className="Navbar">
      <div className="logo">
        <a href="#">reactcolorpicker</a>
      </div>
      <div className="slider-container">
        <span>Level: {level}</span>
        <div className="slider">
          <Slider defaultValue={level} min={100} max={900} step={100} onAfterChange={changeLevel} />
        </div>
      </div>
      <div className="select-container">
        <Select value={colorFormat} onChange={handleFormatChange}>
          <MenuItem value="hex">HEX - #ffffff</MenuItem>
          <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
          <MenuItem value="rgba">RGBA - rgba(255,255,255, 1.0)</MenuItem>
        </Select>
      </div>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={openSnackbar}
        autoHideDuration={3000}
        message={
          <span id="message-id">Format Changed to &quot;{colorFormat.toUpperCase()}&quot;</span>
        }
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        onClose={closeSnackbar}
        action={[
          <IconButton onClick={closeSnackbar} color="inherit" key="close" aria-label="close">
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </header>
  )
}

export default Navbar
