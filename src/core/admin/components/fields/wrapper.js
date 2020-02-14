import Fields from './index'
import React from 'react'

class FieldsWrapper extends React.Component {

  render() {
    return <Fields { ...this.props} />
  }

}

export default FieldsWrapper
