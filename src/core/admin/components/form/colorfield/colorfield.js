import PropTypes from 'prop-types'
import Color from 'color'
import React from 'react'

const palette = [
  '#DB2828',
  '#F2711C',
  '#FBBD08',
  '#B5CC18',
  '#21BA45',
  '#00B5AD',
  '#2185D0',
  '#6435C9',
  '#A333C8',
  '#E03997'
]

class ColorField extends React.Component {

  static propTypes = {
    choosing: PropTypes.bool,
    color: PropTypes.string,
    colors: PropTypes.array,
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
    tabIndex: PropTypes.number,
    onBegin: PropTypes.func,
    onBusy: PropTypes.func,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    onReady: PropTypes.func,
    onSet: PropTypes.func
  }

  static defaultProps = {
    colors: [
      ...new Array(10).fill(0).map((i, j) => {
        const hex = Math.max(Math.min(Math.ceil(255 / 9) * j, 255), 0).toString(16)
        return `#${hex}${hex}${hex}`
      }),
      ...new Array(7).fill(0).reduce((colors, i, j) => [
        ...colors,
        ...Object.values(palette).map((color, index) => {
          const adjustment = ((((400 / 6) * j) - 200) / 200) * -0.5
          return Color(color).lighten(adjustment).hex()
        })
      ], [])
    ],
    defaultValue: null,
    disabled: false,
    tabIndex: 0,
    onBusy: () => {},
    onChange: (value) => {},
    onReady: () => {},
    onSet: (value) => {}
  }

  input = null

  _handleBegin = this._handleBegin.bind(this)
  _handleClear = this._handleClear.bind(this)

  render() {
    const { choosing, colors, color, tabIndex } = this.props
    return (
      <div className="colorfield">
        <div className="colorfield-input" onClick={ this._handleBegin }>
          <div className="colorfield-selected" onClick={ this._handleBegin }>
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
        { choosing &&
          <div className="colorfield-chooser" tabIndex={ tabIndex }>
            <div className="colorfield-chooser-colors">
              { colors.map((color, index) => (
                <div key={`color_${index}`} className="colorfield-chooser-color" style={{ backgroundColor: color }} onClick={ this._handleSet.bind(this, color) }>
                  { color === this.props.color && <i className="fa fa-fw fa-check" /> }
                </div>
              )) }
            </div>
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onReady, onSet } = this.props
    if(defaultValue) onSet(defaultValue)
    onReady()
  }

  componentDidUpdate(prevProps) {
    const { color, onChange } = this.props
    if(prevProps.color !== color) onChange(color)
  }

  _getInput() {
    return {
      type: 'text',
      ref: node => this.input = node,
      defaultValue: this.props.color || ''
    }
  }

  _handleBegin() {
    this.props.onBegin()
  }

  _handleClear() {
    this.props.onClear()
  }

  _handleSet(color) {
    this.props.onSet(color)
  }

}

export default ColorField
