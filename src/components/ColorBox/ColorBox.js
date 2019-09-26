import React from 'react'
import './ColorBox.scss'

const ColorBox = props => {
  const { background, name } = props

  console.log(props)
  return (
    <div style={{ background: `${background}` }} className="ColorBox">
      <div className="copy-container">
        <div className="box-content">
          <span>{name}</span>
        </div>
        <button type="button" className="copy-button">
          Copy
        </button>
      </div>
      <span className="see-more">More</span>
    </div>
  )
}

export default ColorBox
