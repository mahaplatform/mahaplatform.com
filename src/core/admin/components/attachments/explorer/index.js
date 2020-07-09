import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import { counts } from '../selectors'
import Stack from '../../stack'
import PropTypes from 'prop-types'
import Sources from '../sources'
import Device from '../device'
import Photos from '../photos'
import Review from '../review'
import Camera from '../camera'
import Files from '../files'
import Drive from '../drive'
import React from 'react'
import Web from '../web'
import _ from 'lodash'

class Explorer extends React.Component {

  static contextTypes = {}

  static propTypes = {
    allow: PropTypes.object,
    cancelText: PropTypes.any,
    counts: PropTypes.object,
    custom: PropTypes.array,
    doneText: PropTypes.string,
    files: PropTypes.array,
    multiple: PropTypes.bool,
    sources: PropTypes.array,
    title: PropTypes.string,
    onAdd: PropTypes.func,
    onCancel: PropTypes.func,
    onNext: PropTypes.func,
    onRemove: PropTypes.func,
    onToggleView: PropTypes.func
  }

  state = {
    cards: [],
    review: false
  }

  _handleNext = this._handleNext.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handleToggleReview = this._handleToggleReview.bind(this)

  render() {
    const { files, multiple } = this.props
    const { review } = this.state
    return (
      <div className={ this._getClass() }>
        <Stack { ...this._getStack() } />
        <CSSTransition in={ multiple && files.length > 0 } classNames="slideup" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
          <div className="maha-attachments-explorer-footer" onClick={ this._handleToggleReview }>
            { files.length } files selected
          </div>
        </CSSTransition>
        <CSSTransition in={ review } classNames="slideup" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
          <Review { ...this._getReview() } />
        </CSSTransition>
      </div>
    )
  }

  _getClass() {
    const { files, multiple } = this.props
    const classes = ['maha-attachments-explorer']
    if(multiple && files.length > 0) classes.push('reviewable')
    return classes.join(' ')
  }

  _getReview() {
    const { onRemove } = this.props
    return {
      onClose: this._handleToggleReview,
      onRemove
    }
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards: [
        { component: Sources, props: this._getSources() },
        ...cards
      ],
      slideFirst: false
    }
  }

  _getSourcePanel(service) {
    if(_.includes(['facebook','instagram','googlephotos'], service)) return Photos
    return Files
  }

  _getServices() {
    const { allow, custom, sources } = this.props
    const { clientWidth } = document.body
    return [
      ...clientWidth < 768 ? [
        { service: 'camera', username: 'Your Camera', component: Camera, id: 'camera', icon: 'camera' }
      ] : [
        { service: 'device', username: 'Your Device', panel: Device, id: 'device' }
      ],
      { service: 'web', username: 'The Web', panel: Web, id: 'web' },
      { service: 'maha', username: 'Maha Drive', panel: Drive, id: 'maha' },
      ...custom ? custom : [],
      ...sources.map(source => ({
        ...source,
        panel: this._getSourcePanel(source.service)
      }))
    ].filter(source => {
      const service_allowed = !allow.services || _.includes(allow.services, source.service)
      const type_allowed = !allow.types || !source.type || _.includes(allow.types, source.type)
      return service_allowed && type_allowed
    })
  }

  _getSources() {
    const { allow, counts, cancelText, doneText, multiple, title, onAdd, onCancel, onRemove, onToggleView } = this.props
    return {
      allow,
      counts,
      cancelText,
      doneText,
      multiple,
      sources: this._getServices(),
      title,
      onAdd,
      onBack: this._handlePop,
      onCancel,
      onNext: this._handleNext,
      onPush: this._handlePush,
      onRemove,
      onToggleView
    }
  }

  _handleNext() {
    this.props.onNext()
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

  _handleToggleReview() {
    const { review } = this.state
    this.setState({
      review: !review
    })
  }

}

const mapStateToProps = (state, props) => ({
  counts: counts(state.maha.attachments, props),
  files: state.maha.attachments.files,
  sources: state.maha.attachments.sources
})

export default connect(mapStateToProps)(Explorer)
