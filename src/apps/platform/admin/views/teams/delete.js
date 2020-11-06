import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class Delete extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    team: PropTypes.object,
    onDone: PropTypes.func
  }

  form = null

  state = {
    phrase: null
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { team } = this.props
    const { phrase } = this.state
    return {
      reference: node => this.form = node,
      title: 'Are you Sure?',
      action: `/api/admin/platform/teams/${team.id}`,
      method: 'delete',
      onCancel: this._handleCancel,
      onChange: this._handleChange,
      onSuccess: this._handleSuccess,
      cancelIcon: 'times',
      saveText: null,
      buttons: [
        {
          label: 'Delete',
          color: 'red',
          disabled: phrase !== team.subdomain,
          handler: this._handleSubmit
        }
      ],
      sections: [
        {
          instructions: (
            <div>
              <p>
                This will permanenty delete the <strong>{ team.subdomain }</strong> team
                and all its associated data. Are you sure you want to proceed?
              </p>
              <p>
                Please type <strong>{ team.subdomain }</strong> to confirm.
              </p>
            </div>
          ),
          fields: [
            { name: 'phrase', type: 'textfield', required: true }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleChange({ phrase }) {
    this.setState({ phrase })
  }

  _handleSubmit() {
    this.form.submit()
  }

  _handleSuccess() {
    this.context.router.history.goBack()
    this.context.modal.close()
  }

}

export default Delete
