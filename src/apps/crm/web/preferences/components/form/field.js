import Confirmation from './confirmation'
import Checkboxes from './checkboxes'
import EmailField from './emailfield'
import TextField from './textfield'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Field extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    error: PropTypes.string,
    field: PropTypes.object,
    index: PropTypes.number,
    status: PropTypes.string,
    token: PropTypes.string,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onValidate: PropTypes.func
  }

  state = {
    htmlFor: null
  }

  render() {
    const { error, field } = this.props
    const { instructions, label } = field
    const { htmlFor } = this.state
    const Component = this._getComponent(field)
    return (
      <div className={ this._getClass() }>
        { label && <label htmlFor={ htmlFor }>{ label }</label> }
        { instructions &&
          <div className="field-instructions" dangerouslySetInnerHTML={{ __html: instructions }} />
        }
        <Component { ...this._getField() } />
        { error &&
          <div className="field-error">
            { error }
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    this.setState({
      htmlFor: _.random(100000000, 999999999).toString(36)
    })
  }

  _getClass() {
    const { error, field } = this.props
    const classes = ['maha-field']
    if(error) classes.push('field-invalid')
    if(field.required) classes.push('required')
    return classes.join(' ')
  }

  _getComponent(field) {
    if(field.type === 'checkboxes') return Checkboxes
    if(field.type === 'confirmation') return Confirmation
    if(field.type === 'emailfield') return EmailField
    if(field.type === 'textfield') return TextField
  }

  _getField() {
    const { code, field, index, status, token, onChange, onReady, onValidate } = this.props
    const { htmlFor } = this.state
    return {
      code,
      htmlFor,
      ..._.omit(field, ['code']),
      status,
      tabIndex: index + 1,
      token,
      onChange,
      onReady,
      onValidate
    }
  }

}

export default Field
