import Form from './index'
import React from 'react'

class FormWrapper extends React.Component {

  render() {
    return <Form { ...this.props } />
  }

}

export default FormWrapper
