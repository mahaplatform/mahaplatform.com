import PropTypes from 'prop-types'
import Control from './control'
import React from 'react'

class Fields extends React.Component {

  static propTypes = {
    data: PropTypes.object,
    errors: PropTypes.object,
    fields: PropTypes.array,
    status: PropTypes.string,
    onSetBusy: PropTypes.func,
    onSetReady: PropTypes.func,
    onSetValid: PropTypes.func,
    onUpdate: PropTypes.func
  }

  render() {
    const { fields } = this.props
    const numbers = ['zero','one','two','three','four','five','six','seven','eight','nine','ten']
    return (
      <div className={`${numbers[fields.length]} fields`}>
        { fields.map((field, index) => (
          <Control key={`field_${index}`} { ...this._getControl(field) } />
        )) }
      </div>
    )
  }

  _getControl(field) {
    const { data, errors, status, onSetBusy, onSetReady, onSetValid, onUpdate } = this.props
    return {
      data,
      errors,
      field,
      status,
      onSetBusy,
      onSetReady,
      onSetValid,
      onUpdate
    }
  }

}

export default Fields
