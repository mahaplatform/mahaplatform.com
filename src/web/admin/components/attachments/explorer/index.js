import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import { counts } from '../selectors'
import Stack from '../../stack'
import PropTypes from 'prop-types'
import Sources from '../sources'
import Device from '../device'
import Photos from '../photos'
import Review from '../review'
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
    doneText: PropTypes.string,
    files: PropTypes.array,
    multiple: PropTypes.bool,
    sources: PropTypes.array,
    onAdd: PropTypes.func,
    onCancel: PropTypes.func,
    onNext: PropTypes.func,
    onRemove: PropTypes.func
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
        <CSSTransition in={ files.length > 0 } classNames="slideup" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
          <div className="maha-attachments-explorer-footer" onClick={ this._handleToggleReview }>
            { files.length } files selected
          </div>
        </CSSTransition>
        <CSSTransition in={ review && multiple } classNames="slideup" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
          <Review { ...this._getReview() } />
        </CSSTransition>
      </div>
    )
  }

  _getClass() {
    const { files } = this.props
    const classes = ['maha-attachments-explorer']
    if(files.length > 0) classes.push('reviewable')
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

  _getSourceComponent(service) {
    if(_.includes(['facebook','instagram','googlephotos'], service)) return Photos
    return Files
  }

  _getServices() {
    const { allow, sources } = this.props
    return [
      { service: 'device', username: 'Your Device', component: Device, id: 'device' },
      { service: 'web', username: 'The Web', component: Web, id: 'web' },
      { service: 'maha', username: 'Maha Drive', component: Drive, id: 'maha' },
      ...sources.map(source => ({
        ...source,
        component: this._getSourceComponent(source.service)
      }))
    ].filter(source => {
      const service_allowed = !allow.services || _.includes(allow.services, source.service)
      const type_allowed = !allow.types || !source.type || _.includes(allow.types, source.type)
      return service_allowed && type_allowed
    })
  }

  _getSources() {
    const { allow, counts, cancelText, doneText, multiple, onAdd, onCancel, onRemove } = this.props
    return {
      allow,
      counts,
      cancelText,
      doneText,
      multiple,
      sources: this._getServices(),
      onAdd,
      onBack: this._handlePop,
      onCancel,
      onNext: this._handleNext,
      onPush: this._handlePush,
      onRemove
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
