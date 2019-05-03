import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class CompleteForm extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    commitment: PropTypes.object,
    plan: PropTypes.object,
    onSuccess: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { commitment, plan } = this.props
    return {
      title: 'Complete',
      method: 'patch',
      action: `/api/admin/competencies/plans/${plan.id}/commitments/${commitment.id}/complete`,
      saveText: 'Complete',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Do you have any comments?', name: 'comments', type: 'textarea' }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(trip) {
    this.context.modal.close()
  }
}


class Complete extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    commitment: PropTypes.object,
    plan: PropTypes.object
  }

  _handleClick = this._handleClick.bind(this)

  render() {
    return (
      <div className={ this._getClass() } onClick={ this._handleClick }>
        <i className="fa fa-check" />
      </div>
    )
  }

  _getClass() {
    const { commitment } = this.props
    const classes = ['goal-status']
    if(commitment.is_complete) classes.push('complete')
    return classes.join(' ')
  }

  _handleClick() {
    const { commitment, plan } = this.props
    if(commitment.is_complete) return false
    this.context.modal.open(() => <CompleteForm commitment={ commitment } plan={ plan } />)
  }

}


export default Complete
