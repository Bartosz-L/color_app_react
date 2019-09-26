import React from 'react'
import './ColorBox.scss'

const ColorBox = props => {
  const { background, name } = props

  console.log(props)
  return (
    <div style={{ background: `${background}` }} className="ColorBox">
      <span>{name}</span>
      <span>MORE</span>
    </div>
  )
}

export default ColorBox
