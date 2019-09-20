import { connect } from 'react-redux'
import Stack from '../stack/stack'
import PropTypes from 'prop-types'
import Explorer from './explorer'
import Loader from '../loader'
import Review from './review'
import React from 'react'

class Attachments extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    allow: PropTypes.object,
    apps: PropTypes.array,
    assets: PropTypes.array,
    cancelText: PropTypes.any,
    counts: PropTypes.object,
    doneText: PropTypes.string,
    files: PropTypes.array,
    multiple: PropTypes.bool,
    prompt: PropTypes.string,
    sources: PropTypes.array,
    status: PropTypes.string,
    onAdd: PropTypes.func,
    onCancel: PropTypes.func,
    onChooseAssets: PropTypes.func,
    onCreate: PropTypes.func,
    onFetch: PropTypes.func,
    onDone: PropTypes.func,
    onRemove: PropTypes.func
  }

  static defaultProps = {
    allow: {},
    cancelText: 'Cancel',
    doneText: 'Done',
    multiple: false,
    prompt: 'Attach Files',
    onChooseAssets: () => {}
  }

  state = {
    cards: []
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleFetch = this._handleFetch.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handleRemove = this._handleRemove.bind(this)
  _handleReview = this._handleReview.bind(this)

  render() {
    const { status } = this.props
    if(status === 'loading') return <Loader />
    if(status !== 'loaded') return null
    return <Stack { ...this._getStack() } />
  }

  componentDidMount() {
    this._handleJoin()
    this._handleFetch()
  }

  componentDidUpdate(prevProps) {
    const { multiple, files } = this.props
    if(!multiple && files.length !== prevProps.files.length && files.length === 1) {
      this._handleReview()
    }
  }

  componentWillUnmount() {
    this._handleLeave()
  }

  _getExplorer() {
    const { allow, cancelText, doneText, multiple, onAdd, onCreate } = this.props
    return {
      allow,
      cancelText,
      doneText,
      multiple,
      onAdd,
      onCancel: this._handleCancel,
      onCreate,
      onNext: this._handleReview,
      onRemove: this._handleRemove
    }
  }

  _handleRemove(index) {
    this.props.onRemove(index)
  }

  _getReview() {
    const { doneText, multiple } = this.props
    return {
      doneText,
      multiple,
      onBack: this._handlePop,
      onDone: this._handleDone,
      onRemove: this._handleRemove
    }
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards: [
        { component: Explorer, props: this._getExplorer() },
        ...cards
      ],
      slideFirst: false
    }
  }

  _handleCancel() {
    const { onCancel } = this.props
    if(onCancel) return onCancel()
    this.context.modal.pop()
  }

  _handleDone() {
    const { assets, multiple, onChooseAssets, onDone } = this.props
    const result = (multiple) ? assets : assets[0]
    onChooseAssets(result)
    if(onDone) return onDone()
    this.context.modal.pop()
  }

  _handleFetch() {
    const { allow } = this.props
    const filter = allow.types ? {
      $filter: {
        type: {
          $in: allow.types
        }
      }
    } : null
    this.props.onFetch(filter)
  }

  _handleJoin() {
    const { network } = this.context
    const channel = '/admin/account/profiles'
    network.join(channel)
    network.subscribe([
      { target: channel, action: 'refresh', handler: this._handleFetch }
    ])
  }

  _handleLeave() {
    const { network } = this.context
    const channel = '/admin/account/profiles'
    network.leave(channel)
    network.unsubscribe([
      { target: channel, action: 'refresh', handler: this._handleFetch }
    ])
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

  _handleReview() {
    this._handlePush(Review, this._getReview())
  }

}

const mapStateToProps = (state, props) => ({
  apps: state.maha.admin.apps
})

export default connect(mapStateToProps)(Attachments)
