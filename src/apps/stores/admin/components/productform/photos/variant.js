import MediaField from '../../../components/mediafield'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Variant extends React.Component {

  static propTypes = {
    variant: PropTypes.object,
    onBack: PropTypes.func,
    onDone: PropTypes.func
  }

  state = {
    variant: {}
  }

  _handleBack = this._handleBack.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    if(!this.state.variant) return null
    return <Form { ...this._getForm() } />
  }

  componentDidMount() {
    const { variant } = this.props
    this.setState({ variant })
  }

  _getForm() {
    return {
      title: 'Edit Variant Photos',
      cancelIcon: 'chevron-left',
      saveText: 'Done',
      onCancel: this._handleBack,
      onChange: this._handleChange,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Photos', name: 'photos', type: MediaField }
          ]
        }
      ]
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChange(variant) {
    this.setState({ variant })
  }

  _handleSuccess(variant) {
    this.props.onDone(variant)
  }

}

export default Variant
