import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import useAsyncState from '../utils/useAsyncState'
import './ColorBox.scss'

const ColorBox = props => {
  const [copied, setCopied] = useAsyncState(false)

  const { background, name } = props

  const changeCopyState = async () => {
    const newCopiedVal = await setCopied(true)

    setTimeout(() => {
      setCopied(!newCopiedVal)
    }, 1500)
  }
  return (
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      <div style={{ background }} className="ColorBox">
        <div style={{ background }} className={`copy-overlay ${copied && 'show'}`} />
        <div className={`copy-msg ${copied && 'show'}`}>
          <h1>copied!</h1>
          <p>{background}</p>
        </div>
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
