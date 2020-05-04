import React from 'react'
import PropTypes from 'prop-types'
import Field from './field'

class Segment extends React.Component {

  static propTypes = {
    data: PropTypes.object,
    errors: PropTypes.object,
    fields: PropTypes.array,
    status: PropTypes.string,
    tabIndex: PropTypes.number,
    onBusy: PropTypes.func,
    onReady: PropTypes.func,
    onSubmit: PropTypes.func,
    onUpdateData: PropTypes.func,
    onValid: PropTypes.func
  }

  render() {
    const { fields } = this.props
    return (
      <div className="maha-form-segment">
        { fields.map((field, index) => (
          <Field key={`field_${index}_${field.name}`} { ...this._getField(field) } />
        )) }
      </div>
    )
  }

  _getField(field) {
    const { data, errors, status, tabIndex, onBusy, onReady, onSubmit, onUpdateData, onValid } = this.props
    return {
      data,
      errors,
      field,
      status,
      tabIndex,
      onBusy,
      onReady,
      onSubmit,
      onUpdateData,
      onValid
    }
  }

}

export default Segment
