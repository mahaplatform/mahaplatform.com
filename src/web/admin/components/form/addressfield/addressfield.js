import PropTypes from 'prop-types'
import Chooser from './chooser'
import React from 'react'
import _ from 'lodash'

class Addressfield extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    active: PropTypes.bool,
    defaultValue: PropTypes.object,
    options: PropTypes.array,
    placeholder: PropTypes.string,
    prompt: PropTypes.string,
    q: PropTypes.string,
    tabIndex: PropTypes.number,
    value: PropTypes.object,
    onBegin: PropTypes.func,
    onChange: PropTypes.func,
    onChoose: PropTypes.func,
    onClear: PropTypes.func,
    onSet: PropTypes.func,
    onSetOptions: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    placeholder: 'Search for a place or address',
    prompt: 'Search for a place or address',
    onChange: () => {},
    onReady: () => {}
  }

  field = null

  _handleBegin = this._handleBegin.bind(this)
  _handleClear = this._handleClear.bind(this)

  render() {
    const { placeholder, tabIndex, value } = this.props
    return (
      <div className="addressfield" tabIndex={ tabIndex }>
        <div className="addressfield-field" onClick={ this._handleBegin }>
          { value &&
            <div className="addressfield-token">
              { value.description }
            </div>
          }
          { !value &&
            <div className="addressfield-placeholder">
              { placeholder }
            </div>
          }
        </div>
        { value &&
          <div className="addressfield-remove" onClick={ this._handleClear }>
            <i className="fa fa-times" />
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onSet } = this.props
    if(defaultValue) onSet(defaultValue)
    this.props.onReady()
  }

  componentDidUpdate(prevProps) {
    const { active, defaultValue, value, onChange, onChoose } = this.props
    const { form } = this.context
    if(defaultValue !== prevProps.defaultValue) {
      onChoose(defaultValue)
    }
    if(!_.isEqual(value, prevProps.value)) {
      onChange(value)
    }
    if(active !== prevProps.active) {
      if(active) form.push(<Chooser { ...this._getChooser() } />)
      if(!active) form.pop()
    }
  }

  _getChooser() {
    return this.props
  }

  _handleBegin() {
    this.props.onBegin()
  }

  _handleClear() {
    this.props.onClear()
  }

}

export default Addressfield
