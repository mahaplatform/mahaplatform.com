import { ModalPanel, Stack, Steps } from 'maha-admin'
import Confirmation from './confirmation'
import PropTypes from 'prop-types'
import Contact from './contact'
import Program from './program'
import Store from './store'
import React from 'react'

class Main extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    store: PropTypes.object
  }

  state = {
    cards: [],
    step: -1,
    steps: [],
    formdata: {}
  }

  _handleBack = this._handleBack.bind(this)
  _handleCancel = this._handleCancel.bind(this)
  _handleNext = this._handleNext.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handleSave = this._handleSave.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="stores-productform">
          <div className="stores-productform-header">
            <Steps { ...this._getSteps() } />
          </div>
          <div className="stores-productform-body">
            <Stack { ...this._getStack() } />
          </div>
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    this.setState({
      steps: [
        { label: 'Program', component: Program, props: this._getStep.bind(this) },
        { label: 'Details', component: Store, props: this._getStep.bind(this) },
        { label: 'Contact', component: Contact, props: this._getStep.bind(this) },
        { label: 'Confirmation', component: Confirmation, props: this._getStep.bind(this) }
      ],
      step: 0
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { steps, step } = this.state
    if(step > prevState.step ) {
      this._handlePush(steps[step].component, steps[step].props)
    } else if(step < prevState.step ) {
      this._handlePop()
    }
  }

  _getPanel() {
    return {
      title: 'New Store',
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel }
      ]
    }
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _getStep() {
    const { formdata } = this.state
    return {
      formdata,
      onBack: this._handleBack,
      onCancel: this._handleCancel,
      onNext: this._handleNext,
      onSave: this._handleSave
    }
  }

  _getSteps() {
    const { step, steps } = this.state
    return {
      completable: false,
      steps: steps.map(step => {
        return step.label
      }),
      current: step
    }
  }

  _handleBack() {
    this.setState({
      step: this.state.step - 1
    })
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleNext(data) {
    const { step, formdata } = this.state
    this.setState({
      formdata: {
        ...formdata,
        ...data
      },
      step: step + 1
    })
  }

  _handlePop(index = -1) {
    this.setState({
      cards: this.state.cards.slice(0, index)
    })
  }

  _handlePush(component, props) {
    this.setState({
      cards: [
        ...this.state.cards,
        { component, props }
      ]
    })
  }

  _handleSave(data) {
    const store = {
      ...this.state.formdata,
      ...data
    }
    this.context.network.request({
      endpoint: '/api/admin/stores/stores',
      method: 'post',
      body: {
      },
      onFailure: () => {},
      onSuccess: () => {}
    })
  }

}

export default Main
