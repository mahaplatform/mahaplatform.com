import Button from './button'
import PropTypes from 'prop-types'
import Fields from './fields'
import React from 'react'

class Preferences extends React.Component {

  static propTypes = {
    endpoint: PropTypes.string,
    fields: PropTypes.array,
    method: PropTypes.string,
    onChange: PropTypes.func,
    onSetHuman: PropTypes.func,
    onSetReady: PropTypes.func,
    onSetStatus: PropTypes.func,
    onSetValid: PropTypes.func,
    onValidate: PropTypes.func,
    onSubmit: PropTypes.func
  }

  render() {
    return (
      <div className="ui form">
        <Fields { ...this._getFields() } />
        <Button { ...this._getButton() } />
      </div>
    )
  }

  _getButton() {
    return {
      label: 'Update Preferences',
      color: 'blue'
    }
  }

  _getFields() {
    const { fields } = this.props
    return {
      fields
    }
  }

}

export default Preferences
