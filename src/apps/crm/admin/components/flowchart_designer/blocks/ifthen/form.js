import BranchesField from './branchesfield'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class IfThen extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
    fields: PropTypes.array,
    program: PropTypes.object,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onDone: PropTypes.func,
    onTokens: PropTypes.func
  }

  form = null

  state = {
    config: {}
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  componentDidMount() {
    const config = this.props.config || {}
    this.setState({
      config: {
        ...this._getDefault(),
        ...config
      }
    })
  }

  _getForm() {
    const { config } = this.state
    return {
      reference: node => this.form = node,
      title: 'If / Then',
      onCancel: this._handleCancel,
      onSubmit: this._handleDone,
      cancelIcon: 'chevron-left',
      saveText: null,
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleSubmit }
      ],
      sections: [
        {
          fields: [
            { label: 'Branches', name: 'branches', type: BranchesField, defaultValue: config.branches }
          ]
        }
      ]
    }
  }

  _getDefault() {
    return {
      branches: []
    }
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleDone(config) {
    this.props.onDone(config)
  }

  _handleSubmit() {
    this.form.submit()
  }

}

export default IfThen
