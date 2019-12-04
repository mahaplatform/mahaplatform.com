import React from 'react'
import PropTypes from 'prop-types'
import Field from './field'

class Fields extends React.Component {

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
    const numbers = ['zero','one','two','three','four','five','six','seven','eight','nine','ten']
    return (
      <div className={`${numbers[fields.length]} fields`}>
        { fields.map((field, index) => (
          <Field key={`field_${index}`} { ...this._getField(field) } />
        )) }
      </div>
    )
  }

  componentDidMount() {
    this.props.onReady()
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

export default Fields
