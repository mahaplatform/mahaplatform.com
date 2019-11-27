import React from 'react'
import PropTypes from 'prop-types'
import Field from './field'

class Fields extends React.Component {

  static propTypes = {
    data: PropTypes.object,
    errors: PropTypes.object,
    field: PropTypes.object,
    tabIndex: PropTypes.number,
    onBusy: PropTypes.func,
    onReady: PropTypes.func,
    onUpdateData: PropTypes.func
  }

  render() {
    const { field } = this.props
    const { fields } = field
    const numbers = ['zero','one','two','three','four','five','six']
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
    const { data, errors, tabIndex, onBusy, onReady, onUpdateData } = this.props
    return {
      data,
      errors,
      field,
      tabIndex,
      onBusy,
      onReady,
      onUpdateData
    }
  }

}

export default Fields
