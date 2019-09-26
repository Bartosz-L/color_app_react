import React from 'react'
import './ColorBox.scss'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const ColorBox = props => {
  const { background, name } = props

  console.log(props)
  return (
    <CopyToClipboard text={background}>
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
    </CopyToClipboard>
  )
}

export default ColorBox
