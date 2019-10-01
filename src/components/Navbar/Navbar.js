import React from 'react'
import Slider from 'rc-slider'
import { Link } from 'react-router-dom'
import { Select, MenuItem, Snackbar, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { withStyles } from '@material-ui/styles'
import 'rc-slider/assets/index.css'
import useAsyncState from '../../utils/useAsyncState'
import styles from '../../styles/Navbar.styles'

const Navbar = props => {
  const [colorFormat, setColorFormat] = useAsyncState('hex')
  const [openSnackbar, setOpenSnackbar] = useAsyncState(false)

  const { level, changeLevel, changeColorFormat, isSingleColor, classes } = props

  const handleFormatChange = async e => {
    const newColorFormat = await setColorFormat(e.target.value)
    changeColorFormat(newColorFormat)
    setOpenSnackbar(true)
  }

  const closeSnackbar = () => {
    setOpenSnackbar(false)
  }

  return (
    <header className={classes.Navbar}>
      <div className={classes.logo}>
        <Link to="/">reactcolorpicker</Link>
      </div>
      {!isSingleColor && (
        <div>
          <span>Level: {level}</span>
          <div className={classes.slider}>
            <Slider
              defaultValue={level}
              min={100}
              max={900}
              step={100}
              onAfterChange={changeLevel}
            />
          </div>
        </div>
      )}

      <div className={classes.selectContainer}>
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

export default withStyles(styles)(Navbar)
