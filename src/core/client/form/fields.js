import React from 'react'
import PropTypes from 'prop-types'
import Field from './field'

class Fields extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    errors: PropTypes.object,
    fields: PropTypes.array,
    index: PropTypes.number,
    status: PropTypes.string,
    tabIndex: PropTypes.number,
    token: PropTypes.string,
    onChange: PropTypes.func,
    onSetReady: PropTypes.func,
    onSetValid: PropTypes.func
  }

  render() {
    const { fields } = this.props
    const numbers = ['zero','one','two','three','four','five','six','seven','eight','nine','ten']
    return (
      <div className={`${numbers[fields.length]} fields`}>
        { fields.map((field, index) => (
          <Field key={`field_${index}`} { ...this._getField(field, index) } />
        )) }
      </div>
    )
  }

  _getField(field, index) {
    const { code, errors, status, tabIndex, token, onChange, onSetReady, onSetValid } = this.props
    return {
      code,
      errors,
      field,
      index,
      status,
      tabIndex: parseFloat(tabIndex) + parseFloat((index + 1) / 10),
      token,
      onChange,
      onSetReady,
      onSetValid
    }
  }

}

export default Fields
