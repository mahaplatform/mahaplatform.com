import { Loader, ModalPanel } from 'maha-admin'
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
  _handleNext = this._handleNext.bind(this)
  _handlePrevious = this._handlePrevious.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    const { index, parsed } = this.state
    if(!parsed) return <Loader />
    const record = this._getRecord()
    const rowNumber = this._getRowNumber()
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-import-preview-result">
          <div className="maha-import-preview-pager">
            <div className="maha-import-preview-pager-item">
              { index > 0 ?
                <div className="ui green tiny fluid button" onClick={ this._handlePrevious }>
                  <i className="fa fa-fw fa-chevron-left" />
                </div> :
                <div className="ui tiny fluid button disabled">
                  <i className="fa fa-fw fa-chevron-left" />
                </div>
              }
            </div>
            <div className="maha-import-preview-pager-item">
              <label>Row Number: { rowNumber }</label>
            </div>
            <div className="maha-import-preview-pager-item">
              { index < parsed.rows.length - 1 ?
                <div className="ui green tiny fluid button" onClick={ this._handleNext }>
                  <i className="fa fa-fw fa-chevron-right" />
                </div> :
                <div className="ui tiny fluid button disabled">
                  <i className="fa fa-fw fa-chevron-right" />
                </div>
              }
            </div>
          </div>
          <div className="maha-import-preview-body">
            <table className="maha-import-preview-record">
              <tbody>
                { record.map((property, index) => (
                  <tr key={`property_${index}`}>
                    <th>{ property.key }</th>
                    <td>{ property.value }</td>
                  </tr>
                )) }
              </tbody>
            </table>
          </div>
        </div>
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

  _getRecord() {
    const { index, parsed } = this.state
    if(!parsed) return null
    return parsed.headers.map((key, i) => ({
      key,
      value: parsed.rows[index][i]
    }))
  }

  _getRowNumber() {
    const { index, headers } = this.state
    return (headers ? 1 : 0) + index + 1
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

  _handleNext() {
    const { index } = this.state
    this.setState({
      index: index + 1
    })
  }

  _handlePrevious() {
    const { index } = this.state
    this.setState({
      index: index - 1
    })
  }

  _handleSuccess(result) {
    this.setState({
      parsed: result.data
    })
  }

}

export default Preview
