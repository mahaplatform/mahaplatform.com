import PropTypes from 'prop-types'
import Chooser from './chooser'
import React from 'react'
import Edit from './edit'
import _ from 'lodash'

class Addressfield extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    cid: PropTypes.string,
    defaultValue: PropTypes.object,
    options: PropTypes.array,
    placeholder: PropTypes.string,
    prompt: PropTypes.string,
    q: PropTypes.string,
    tabIndex: PropTypes.number,
    value: PropTypes.object,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onChoose: PropTypes.func,
    onClear: PropTypes.func,
    onQuery: PropTypes.func,
    onReady: PropTypes.func,
    onSet: PropTypes.func,
    onSetOptions: PropTypes.func
  }

  static defaultProps = {
    placeholder: 'Search for a place or address',
    prompt: 'Search for a place or address',
    onChange: () => {},
    onReady: () => {}
  }

  field = null

  _handleBegin = this._handleBegin.bind(this)
  _handleCancel = this._handleCancel.bind(this)
  _handleChoose = this._handleChoose.bind(this)
  _handleClear = this._handleClear.bind(this)
  _handleDone = this._handleDone.bind(this)

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
    const { defaultValue, value, onChange, onChoose } = this.props
    if(defaultValue !== prevProps.defaultValue) {
      onChoose(defaultValue)
    }
    if(!_.isEqual(value, prevProps.value)) {
      onChange(value)
    }
  }

  _getChooser() {
    const { cid, onQuery, onSetOptions } = this.props
    return {
      cid,
      onCancel: this._handleCancel,
      onChoose: this._handleChoose,
      onQuery,
      onSetOptions
    }
  }

  _getEdit() {
    const { cid } = this.props
    return {
      cid,
      onCancel: this._handleCancel,
      onDone: this._handleDone
    }
  }

  _handleBegin() {
    const { form } = this.context
    const { value } = this.props
    if(value) return form.push(<Edit { ...this._getEdit() } />)
    return form.push(<Chooser { ...this._getChooser() } />)
  }

  _handleCancel() {
    this.context.form.pop()
  }

  _handleChoose(value) {
    this.props.onChoose(value)
    this.context.form.pop()
  }

  _handleClear() {
    this.props.onClear()
  }

  _handleDone(value) {
    this.props.onChoose(value)
    this.context.form.pop()
  }

}

export default Addressfield
