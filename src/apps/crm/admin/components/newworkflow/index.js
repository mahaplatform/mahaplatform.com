import ManualEnrollment from './manual_enrollment'
import FormSubmission from './form_submission'
import EmailOpen from './email_open'
import { Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import Programs from './programs'
import Types from './types'
import React from 'react'

const types = [
  {
    component: FormSubmission,
    value: 'form_submission'
  },{
    component: EmailOpen,
    value: 'email_open'
  },{
    component: FormSubmission,
    value: 'email_click'
  },{
    component: ManualEnrollment,
    value: 'manual_enrollment'
  }
]

class NewWorkflow extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    type: PropTypes.string,
    onSet: PropTypes.func
  }

  state = {
    type: null,
    cards: []
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handleProgram = this._handleProgram.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handleTypes = this._handleTypes.bind(this)

  render() {
    return <Stack { ...this._getStack()} />
  }

  componentDidMount() {
    this._handlePush(Types, this._getTypes())
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _getPrograms() {
    return {
      onBack: this._handlePop,
      onChoose: this._handleProgram
    }
  }

  _getTypes() {
    return {
      types,
      onCancel: this._handleCancel,
      onChoose: this._handleTypes
    }
  }

  _getType(program_id, trigger_type) {
    return {
      program_id,
      trigger_type,
      onBack: this._handlePop,
      onDone: this._handleDone
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleDone(result) {
    this.context.router.history.push(`/admin/crm/workflows/${result.id}`)
    this.context.modal.close()
  }

  _handlePop(index = -1) {
    this.setState({
      cards:this.state.cards.slice(0, index)
    })
  }

  _handleProgram(program_id) {
    const { type } = this.state
    this._handlePush(type.component, this._getType(program_id, type.value))
  }

  _handlePush(component, props) {
    this.setState({
      cards: [
        ...this.state.cards,
        { component, props }
      ]
    })
  }

  _handleTypes(type) {
    this.setState({ type })
    this._handlePush(Programs, this._getPrograms())
  }

}

export default NewWorkflow
