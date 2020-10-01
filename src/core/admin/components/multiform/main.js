import ModalPanel from '../modal_panel'
import PropTypes from 'prop-types'
import Stack from '../stack'
import Steps from '../steps'
import React from 'react'

class Main extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    endpoint: PropTypes.string,
    formatData: PropTypes.func,
    getSteps: PropTypes.func,
    method: PropTypes.string,
    title: PropTypes.string,
    onCancel: PropTypes.func,
    onSuccess: PropTypes.func
  }

  state = {
    cards: [],
    formdata: {},
    step: -1
  }

  _handleBack = this._handleBack.bind(this)
  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleNext = this._handleNext.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handleSave = this._handleSave.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="multiform">
          <div className="multiform-header">
            <Steps { ...this._getSteps() } />
          </div>
          <div className="multiform-body">
            <Stack { ...this._getStack() } />
          </div>
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    this.setState({
      step: 0
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { formdata, step } = this.state
    const steps = this.props.getSteps(formdata)
    if(step > prevState.step ) {
      this._handlePush(steps[step].component, this._getStep.bind(this))
    } else if(step < prevState.step ) {
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
    const { formdata } = this.state
    return {
      formdata,
      onBack: this._handleBack,
      onCancel: this._handleCancel,
      onChange: this._handleChange,
      onNext: this._handleNext,
      onSave: this._handleSave
    }
  }

  _getSteps() {
    const { formdata, step } = this.state
    const steps = this.props.getSteps(formdata)
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
    this.props.onCancel()
  }

  _handleChange(formdata) {
    const { getSteps } = this.props
    this.setState({
      formdata,
      steps: getSteps(formdata)
    })
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
    const { endpoint, formatData, method, onSuccess } = this.props
    this.context.network.request({
      endpoint,
      method,
      body: formatData({
        ...this.state.formdata,
        ...data
      }),
      onFailure: () => {},
      onSuccess: (result) => {
        onSuccess(result.data)
      }
    })
  }

}

export default Main
