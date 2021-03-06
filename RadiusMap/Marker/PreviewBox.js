import React, { useState, useEffect, memo } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { K_CIRCLE_SIZE } from './styles'

const HEIGHT = 100
const WIDTH = 200

const styles = {
  display: 'block',
  margin: 'auto',
  padding: '6px',
  alignContent: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  height: HEIGHT,
  width: WIDTH,
  position: 'absolute',
  left: -(WIDTH / 2) + 16,
  bottom: K_CIRCLE_SIZE - 2,
  backgroundColor: 'white',
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  borderRadius: 4,
  zIndex: 999
}

const mountedStyles = {
  ...styles,
  transform: 'perspective(1px) translate3d(0, 0, 0) scale3d(1.5, 1.5, 1)',
  transition: '-webkit-transform 0.3s cubic-bezier(0.485, 1.65, 0.545, 0.835)',
  willChange: 'transform',
  backgroundRepeat: 'no-repeat',
  backfaceVisibility: 'hidden',
  WebkitFontSmoothing: 'subpixel-antialiased'
}

const lineStyle = {
  marginTop: 8,
  height: K_CIRCLE_SIZE,
  width: 'calc(100% - 12px)',
  borderTop: '1px solid #808080',
  position: 'absolute',
  bottom: 0
}

const column = {
  position: 'absolute',
  bottom: 'calc(50% - 4px)'
}

const leftColumn = {
  ...column,
  left: 0
}

const rightColumn = {
  ...column,
  right: 0
}

const PreviewBox = ({ $dimensionKey, clientName, siteDescription, score, lastActivity }) => {
  const [styles, setStyles] = useState(styles)

  useEffect(() => {
    setStyles(mountedStyles)
  }, [])

  const lastActivityMoment = moment(lastActivity).format('MM/DD/YYYY')

  return (
    <div style={styles}>
      <div>{clientName}</div>
      <div>{siteDescription}</div>
      <div style={lineStyle}>
        <div style={leftColumn}>
          <i>Last activity</i>
        </div>
        <div style={rightColumn}>
          <i>{lastActivityMoment}</i>
        </div>
      </div>
    </div>
  )
}

PreviewBox.propTypes = {
  $dimensionKey: PropTypes.string,
  clientName: PropTypes.string,
  siteDescription: PropTypes.string,
  score: PropTypes.number,
  lastActivity: PropTypes.string
}

export default memo(PreviewBox)
