import React from 'react'
import { Link } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import chroma from 'chroma-js'
import useAsyncState from '../../utils/useAsyncState'
import './ColorBox.scss'

const ColorBox = props => {
  const [copied, setCopied] = useAsyncState(false)
  const { background, name, singlePaletteURL, showLink } = props

  const isDarkColor = chroma(background).luminance() <= 0.08
  const isLightColor = chroma(background).luminance() <= 0.7

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
          <p className={isLightColor && 'dark-text'}>{background}</p>
        </div>
        <div className="copy-container">
          <div className="box-content">
            <span className={isDarkColor && 'light-text'}>{name}</span>
          </div>
          <button type="button" className={`copy-button ${isLightColor && 'dark-text'}`}>
            Copy
          </button>
        </div>
        {showLink && (
          <Link to={singlePaletteURL} onClick={e => e.stopPropagation()}>
            <span className={`see-more ${isLightColor && 'dark-text'}`}>MORE</span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  )
}

export default ColorBox
