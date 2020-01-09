import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Preview extends React.PureComponent {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    asset: PropTypes.object,
    onBack: PropTypes.func,
    onDone: PropTypes.func
  }

  state = {
    delimiter: ',',
    headers: true,
    index: 0,
    parsed: null,
    quote: '"'
  }

  _handleBack = this._handleBack.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleFetch = this._handleFetch.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        preview
      </ModalPanel>
    )
  }

  componentDidMount() {
    this._handleFetch()
  }

  _getPanel() {
    return {
      title: 'Preview Data',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ],
      rightItems: [
        { label: 'Next', handler: this._handleDone }
      ]
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleDone() {
    this.props.onDone()
  }

  _handleFetch() {
    const { delimiter, headers, quote } = this.state
    const { asset } = this.props
    this.context.network.request({
      method: 'post',
      endpoint: '/api/admin/crm/imports/preview',
      body: {
        asset_id: asset.id,
        delimiter,
        headers,
        quote
      },
      onSuccess: this._handleSuccess
    })
  }

  _handleSuccess(result) {
    this.setState({
      parsed: result.data
    })
  }

}

export default Preview
