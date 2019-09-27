import React from 'react'
import Slider from 'rc-slider'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import 'rc-slider/assets/index.css'
import './Navbar.scss'
import useAsyncState from '../../utils/useAsyncState'

const Navbar = props => {
  const [colorFormat, setColorFormat] = useAsyncState('hex')

  const { level, changeLevel, changeColorFormat } = props

  const handleChange = async e => {
    const newColorFormat = await setColorFormat(e.target.value)
    changeColorFormat(newColorFormat)
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
        <Select value={colorFormat} onChange={handleChange}>
          <MenuItem value="hex">HEX - #ffffff</MenuItem>
          <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
          <MenuItem value="rgba">RGBA - rgba(255,255,255, 1.0)</MenuItem>
        </Select>
      </div>
    </header>
  )
}

export default Navbar
