import ModalPanel from '../modal_panel'
import PropTypes from 'prop-types'
import Message from '../message'
import Loader from '../loader'
import Stack from '../stack'
import Steps from '../steps'
import React from 'react'
import _ from 'lodash'

class Main extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    action: PropTypes.string,
    endpoint: PropTypes.string,
    formdata: PropTypes.object,
    formatData: PropTypes.func,
    method: PropTypes.string,
    props: PropTypes.object,
    status: PropTypes.string,
    step: PropTypes.number,
    steps: PropTypes.array,
    title: PropTypes.string,
    onCancel: PropTypes.func,
    onSave: PropTypes.func,
    onSetStep: PropTypes.func,
    onSuccess: PropTypes.func,
    onUpdateData: PropTypes.func
  }

  state = {
    cards: []
  }

  _handleBack = this._handleBack.bind(this)
  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleNext = this._handleNext.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handleSave = this._handleSave.bind(this)

  render() {
    const { status } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        { _.includes(['loading','saving'], status) && <Loader /> }
        { status === 'failiure' && <Message { ...this._getFailure()} /> }
        { status === 'ready' &&
          <div className="multiform">
            <div className="multiform-header">
              <Steps { ...this._getSteps() } />
            </div>
            <div className="multiform-body">
              <Stack { ...this._getStack() } />
            </div>
          </div>
        }
      </ModalPanel>
    )
  }

  componentDidMount() {
    this.props.onSetStep(0)
  }

  componentDidUpdate(prevProps) {
    const { step, steps } = this.props
    if(step > prevProps.step ) {
      this._handlePush(steps[step].component, this._getStep.bind(this))
    } else if(step < prevProps.step ) {
      this._handlePop()
    }
  }

  _getPanel() {
    const { title } = this.props
    return {
      title,
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
    const { formdata, props, onSetStep } = this.props
    return {
      formdata,
      props,
      onBack: this._handleBack,
      onCancel: this._handleCancel,
      onChange: this._handleChange,
      onNext: this._handleNext,
      onSave: this._handleSave,
      onSetStep
    }
  }

  _getSteps() {
    const { step, steps } = this.props
    return {
      completable: false,
      steps: steps.map(step => {
        return step.label
      }),
      current: step
    }
  }

  _handleBack() {
    const { step } = this.props
    this.props.onSetStep(step - 1)
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChange(data) {
    const { step, formdata } = this.props
    this.props.onUpdateData({
      ...formdata,
      ...data
    }, step)
  }

  _handleNext(data) {
    const { step, formdata } = this.props
    this.props.onUpdateData({
      ...formdata,
      ...data
    }, step + 1)
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
    const { action, formatData, method } = this.props
    const body = formatData({
      ...this.props.formdata,
      ...data
    })
    this.props.onSave(action, method, body)
  }

}

export default Main
