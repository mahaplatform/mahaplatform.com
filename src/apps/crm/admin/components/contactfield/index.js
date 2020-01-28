import PropTypes from 'prop-types'
import Chooser from './chooser'
import React from 'react'
import _ from 'lodash'

class ContactField extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.object,
    options: PropTypes.array,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    value: null
  }

  _handleBegin = this._handleBegin.bind(this)
  _handleChoose = this._handleChoose.bind(this)
  _handleClear = this._handleClear.bind(this)

  render() {
    const { value } = this.state
    const field = this._getField()
    return (
      <div className="maha-input" onClick={ this._handleBegin }>
        <div className="maha-input-field">
          { value ?
            <div className="maha-input-token">
              { field.label }
            </div> :
            <div className="maha-input-placeholder">
              Choose a contact field
            </div>
          }
        </div>
        { value &&
          <div className="maha-input-clear" onClick={ this._handleClear}>
            <i className="fa fa-times" />
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if(defaultValue) this.setState({
      value: defaultValue.name
    })
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.state
    if(value !== prevState.value) {
      this._handleChange()
    }
  }

  _getField() {
    const { options } = this.props
    const { value } = this.state
    return _.find(options, { name: value })
  }

  _getChooser() {
    const { options } = this.props
    return {
      options,
      onChoose: this._handleChoose
    }
  }

  _handleBegin() {
    this.context.form.push(<Chooser { ...this._getChooser() } />)
  }

  _handleChange() {
    const field = this._getField()
    this.props.onChange(field)
  }

  _handleChoose(value) {
    this.setState({ value })
  }

  _handleClear(e) {
    e.stopPropagation()
    this.setState({
      value: null
    })
  }

}

export default ContactField
