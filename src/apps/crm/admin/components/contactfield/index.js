import PropTypes from 'prop-types'
import Chooser from './chooser'
import React from 'react'

class ContactField extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.array,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    value: ''
  }

  _handleBegin = this._handleBegin.bind(this)

  render() {
    return (
      <div className="maha-input" onClick={ this._handleBegin }>
        <div className="maha-input-field">
          <div className="maha-input-placeholder">
            contacts
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.onReady()
  }

  _getChooser() {
    return {}
  }

  _handleBegin() {
    this.context.form.push(<Chooser { ...this._getChooser() } />)
  }

}

export default ContactField
