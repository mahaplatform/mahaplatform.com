import { Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import Programs from './programs'
import Types from './types'
import React from 'react'
import _ from 'lodash'

const New = () => <div>foo</div>

const types = [
  {
    component: New,
    value: 'form_submission'
  },{
    component: New,
    value: 'email_open'
  },{
    component: New,
    value: 'email_click'
  },{
    component: New,
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
    program_id: null,
    cards: []
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handleProgram = this._handleProgram.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handleType = this._handleType.bind(this)

  render() {
    return <Stack { ...this._getStack()} />
  }

  componentDidMount() {
    this._handlePush(Programs, this._getPrograms())
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
      onCancel: this._handleCancel,
      onChoose: this._handleProgram
    }
  }

  _getTypes() {
    return {
      types,
      onBack: this._handlePop,
      onChoose: this._handleType
    }
  }

  _getType(direction, program_id) {
    return {
      direction,
      program_id,
      onBack: this._handlePop,
      onDone: this._handleDone
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleDone(result) {
    const type = _.find(types, { value: this.props.type })
    this.context.router.history.push(`/admin/crm/campaigns/${type.medium}/${result.code}`)
    this.context.modal.close()
  }

  _handlePop(index = -1) {
    this.setState({
      cards:this.state.cards.slice(0, index)
    })
  }

  _handleProgram(program_id) {
    this.setState({ program_id })
    this._handlePush(Types, this._getTypes())
  }

  _handlePush(component, props) {
    this.setState({
      cards: [
        ...this.state.cards,
        { component, props }
      ]
    })
  }

  _handleType(type) {
    this.setState({ type })
    this._handlePush(Programs, this._getPrograms())
  }

}

export default NewWorkflow
