import React from 'react'
import PropTypes from 'prop-types'
import Field from './field'

class Fields extends React.Component {

  static propTypes = {
    data: PropTypes.array,
    fields: PropTypes.array,
    frame: PropTypes.any,
    onBusy: PropTypes.func,
    onReady: PropTypes.func,
    onUpdateData: PropTypes.func
  }

  static defaultProps = {
    fields: [],
    onBusy: () => {},
    onReady: () => {},
    onUpdateData: () => {}
  }

  render() {
    const { fields } = this.props
    const numbers = ['zero','one','two','three','four','five','six']
    return (
      <div className={`${numbers[fields.length]} fields`}>
        {fields.map((field, index) => {
          return <Field key={`field_${index}`} { ...this._getField(field) } />
        })}
      </div>
    )
  }

  componentDidMount() {
    this.props.onReady()
  }

  _getField(field) {
    const { data, onBusy, onReady, onUpdateData } = this.props
    return {
      data,
      ...field,
      onBusy,
      onReady,
      onUpdateData
    }

  }

}

export default Fields
