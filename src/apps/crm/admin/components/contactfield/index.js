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
    fields: PropTypes.array,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    field: null
  }

  _handleChoose = this._handleChoose.bind(this)
  _handleClear = this._handleClear.bind(this)
  _handleLookup = this._handleLookup.bind(this)

  render() {
    const { field } = this.state
    return (
      <div className="maha-input" onClick={ this._handleLookup }>
        <div className="maha-input-field">
          { field ?
            <div className="maha-input-token">
              { field.label }
            </div> :
            <div className="maha-input-placeholder">
              Choose a contact field
            </div>
          }
        </div>
        { field &&
          <div className="maha-input-clear" onClick={ this._handleClear}>
            <i className="fa fa-times" />
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if(defaultValue) {
      this.setState({
        field: defaultValue
      })
    }
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { field } = this.state
    if(!_.isEqual(field, prevState.field)) {
      this.props.onChange(field)
    }
  }

  _getChooser() {
    const { fields } = this.props
    return {
      fields,
      onChoose: this._handleChoose
    }
  }

  _handleChoose(field) {
    this.setState({ field })
  }

  _handleClear(e) {
    e.stopPropagation()
    this.setState({
      field: null
    })
  }

  _handleLookup() {
    this.context.form.push(<Chooser { ...this._getChooser() } />)
  }

}

export default ContactField
