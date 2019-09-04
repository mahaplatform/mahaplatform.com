import PropTypes from 'prop-types'
import React from 'react'

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
    onReady: PropTypes.func,
    onSet: PropTypes.func
  }

  static defaultProps = {
    colors: [
      { name: 'red', value: '#DB2828' },
      { name: 'orange', value: '#F2711C' },
      { name: 'yellow', value: '#FBBD08' },
      { name: 'olive', value: '#B5CC18' },
      { name: 'green', value: '#21BA45' },
      { name: 'teal', value: '#00B5AD' },
      { name: 'blue', value: '#2185D0' },
      { name: 'violet', value: '#6435C9' },
      { name: 'purple', value: '#A333C8' },
      { name: 'pink', value: '#E03997' },
      { name: 'brown', value: '#a5673f' },
      { name: 'black', value: '#000000' },
      { name: 'grey', value: '#767676' },
      { name: 'white', value: '#FFFFFF' },
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

        { choosing &&
          <div className="colorfield-chooser" tabIndex={ tabIndex }>
            { colors.map((color, index) => (
              <div key={`color_${index}`} className="colorfield-color" style={{ backgroundColor: color.value }} onClick={ this._handleSet.bind(this, color.value) }>
                { color.value === this.props.color && <i className="fa fa-fw fa-check" /> }
              </div>
            )) }
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
      value: this.props.color || ''
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
