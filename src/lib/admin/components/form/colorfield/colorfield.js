import PropTypes from 'prop-types'
import Color from 'color'
import React from 'react'
import _ from 'lodash'

const COLOR_REGEX = /[0-9A-Fa-f#]/

const RESERVED = [8,9,37,38,39,40]

const palette = ['#DB2828','#F2711C','#FBBD08','#B5CC18','#21BA45','#00B5AD','#2185D0','#6435C9','#A333C8','#E03997']

const colors = [
  null,
  ...new Array(9).fill(0).map((i, j) => {
    const color = Color('#000000')
    const ratio = ((255 / 8) * j) / 255
    const lightness = color.lightness()
    return color.lightness(lightness + (100 - lightness) * ratio).hex()
  }),
  ...new Array(7).fill(0).reduce((colors, i, j) => [
    ...colors,
    ...Object.values(palette).map((color, index) => {
      const adjustment = ((((400 / 6) * j) - 200) / 200) * -0.5
      return Color(color).lighten(adjustment).hex().toUpperCase()
    })
  ], [])
]

class ColorField extends React.Component {

  static propTypes = {
    open: PropTypes.bool,
    color: PropTypes.string,
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
    tabIndex: PropTypes.number,
    value: PropTypes.string,
    onBusy: PropTypes.func,
    onChange: PropTypes.func,
    onChoose: PropTypes.func,
    onClose: PropTypes.func,
    onClear: PropTypes.func,
    onOpen: PropTypes.func,
    onReady: PropTypes.func,
    onType: PropTypes.func
  }

  static defaultProps = {
    defaultValue: null,
    disabled: false,
    tabIndex: 0,
    onBusy: () => {},
    onChange: (value) => {},
    onReady: () => {},
    onSet: (value) => {}
  }

  control = null

  state = {
    direction: 'down'
  }

  _handleClickOutside = this._handleClickOutside.bind(this)
  _handleClear = this._handleClear.bind(this)
  _handleKeyDown = this._handleKeyDown.bind(this)
  _handleOpen = this._handleOpen.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { color, open, tabIndex } = this.props
    return (
      <div className="colorfield" ref={ node => this.control = node } tabIndex={ tabIndex }>
        <div className="colorfield-input" onClick={ this._handleOpen }>
          <div className="colorfield-selected" onClick={ this._handleOpen }>
            { color ?
              <div className="colorfield-color" style={{ backgroundColor: this.props.color }} /> :
              <div className="colorfield-color null" />
            }
          </div>
          <div className="colorfield-value">
            <input { ...this._getInput() } />
          </div>
          { color !== null &&
            <div className="colorfield-clear" onClick={ this._handleClear }>
              <i className="fa fa-times" />
            </div>
          }
        </div>
        { open &&
          <div className={ this._getClass() }>
            <div className="colorfield-chooser-colors">
              { colors.map((color, index) => (
                <div key={`color_${index}`} { ...this._getColor(color, index) }>
                  { color && color === this.props.color && <i className="fa fa-fw fa-check" /> }
                </div>
              )) }
            </div>
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    document.addEventListener('mousedown', this._handleClickOutside)
    const { defaultValue, onReady, onChoose } = this.props
    if(defaultValue) onChoose(defaultValue)
    onReady()
  }

  componentDidUpdate(prevProps) {
    const { color, onChange } = this.props
    if(prevProps.color !== color) onChange(color)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this._handleClickOutside)
  }

  _getClass() {
    const { direction } = this.state
    const classes = ['colorfield-chooser']
    classes.push(direction)
    return classes.join(' ')
  }

  _getColor(color, index) {
    const classes = ['colorfield-chooser-color']
    if(color === null) classes.push('null')
    return {
      className: classes.join(' '),
      style: { backgroundColor: color || '#FFFFFF' },
      onClick: this._handleChoose.bind(this, color)
    }
  }

  _getInput() {
    const { value } = this.props
    return {
      type: 'text',
      value: value,
      onChange: this._handleUpdate,
      onKeyDown: this._handleKeyDown
    }
  }

  _handleClear(e) {
    e.stopPropagation()
    this.props.onClear()
  }

  _handleClickOutside(e) {
    const { open } = this.props
    if(!open || this.control.contains(e.target)) return
    this.props.onClose()
  }

  _handleOpen(e) {
    e.stopPropagation()
    const percent = (e.clientY / window.innerHeight) * 100
    this.props.onOpen()
    this.setState({
      direction: percent > 75 ? 'up' : 'down'
    })
  }

  _handleChoose(color, e) {
    e.stopPropagation()
    this.props.onChoose(color)
  }

  _handleKeyDown(e) {
    if(e.ctrlKey || e.metaKey || _.includes(RESERVED, e.which) || COLOR_REGEX.test(e.key)) return
    e.preventDefault()
  }

  _handleUpdate(e) {
    const value = e.target.value.substr(0,7).toUpperCase()
    this.props.onType(value)
    if(value.length < 7) return
    this.props.onChoose(value)
  }

}

export default ColorField
