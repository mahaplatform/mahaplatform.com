import Attachment from './attachment'
import Configure from '../configure'
import { Stack } from '@admin'
import PropTypes from 'prop-types'
import Mappings from './mappings'
import Preview from './preview'
import React from 'react'

class File extends React.PureComponent {

  static propTypes = {
    source: PropTypes.object,
    onBack: PropTypes.func,
    onDone: PropTypes.func,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  state = {
    cards: []
  }

  _handleBack = this._handleBack.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleMappings = this._handleMappings.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handlePreview = this._handlePreview.bind(this)
  _handlePush = this._handlePush.bind(this)

  render() {
    return (
      <div className="contactimport">
        <Stack { ...this._getStack() } />
      </div>
    )
  }

  componentDidMount() {
    this._handlePush(Attachment, this._getAttachment())
  }

  _getAttachment() {
    return {
      onBack: this._handleBack,
      onDone: this._handlePreview
    }
  }

  _getMappings(asset, parse, headers) {
    return {
      asset,
      parse,
      headers,
      onPop: this._handlePop,
      onPush: this._handlePush,
      onBack: this._handlePop,
      onDone: this._handleDone
    }
  }

  _getPreview(asset) {
    return {
      asset,
      onBack: this._handlePop,
      onDone: this._handleMappings
    }
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _handleBack() {
    this.props.onPop()
  }

  _handleConfigure(asset, parse, mapping) {
    this._handlePush(Configure, this._getConfigure(asset, parse, mapping))
  }

  _handleDone(asset, params) {
    this.props.onDone({
      ...params,
      name: asset.original_file_name
    })
  }

  _handleMappings(asset, parse, headers) {
    this._handlePush(Mappings, this._getMappings(asset, parse, headers))
  }

  _handlePop(index = -1) {
    this.setState({
      cards: this.state.cards.slice(0, index)
    })
  }

  _handlePreview(asset) {
    this._handlePush(Preview, this._getPreview(asset))
  }

  _handlePush(component, props) {
    this.setState({
      cards: [
        ...this.state.cards,
        { component, props }
      ]
    })
  }

}

export default File
