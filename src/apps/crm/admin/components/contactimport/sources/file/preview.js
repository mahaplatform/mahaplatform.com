import { Loader, ModalPanel } from 'maha-admin'
import Chooser from './chooser'
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
    if(!this.state.parsed) return <Loader />
    const { index, parsed } = this.state
    const { asset } = this.props
    const record = this._getRecord()
    const rowNumber = this._getRowNumber()
    const total = this._getTotal()
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-import-preview">
          <div className="maha-import-preview-header">
            { !asset.file_name.match(/xls/) &&
              <div className="maha-import-preview-header-item">
                <Chooser { ...this._getDelimiter() } />
              </div>
            }
            <div className="maha-import-preview-header-item">
              <Chooser { ...this._getHeaders() } />
            </div>
          </div>
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
                <label>Row { rowNumber } / { total }</label>
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
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    this._handleMatch()
    this._handleFetch()
  }

  componentDidUpdate(prevProps, prevState) {
    const { delimiter, headers } = this.state
    if(delimiter !== prevState.delimiter) {
      this._handleFetch()
    }
    if(headers !== prevState.headers) {
      this._handleFetch()
    }
  }

  _getDelimiter() {
    const { delimiter } = this.state
    return {
      defaultValue: delimiter,
      options: [
        { key: ',', value: 'Comma' },
        { key: '\t', value: 'Tab' },
        { key: ':', value: 'Colon' },
        { key: '|', value: 'Pipe' }
      ],
      onChange: this._handleChange.bind(this, 'delimiter')
    }
  }

  _getHeaders() {
    const { headers } = this.state
    return {
      defaultValue: headers,
      options: [
        { key: true, value: 'Headers' },
        { key: false, value: 'No Headers' }
      ],
      onChange: this._handleChange.bind(this, 'headers')
    }
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
    return index + (headers ? 2 : 1)
  }

  _getTotal() {
    const { headers, parsed } = this.state
    return parsed.rows.length + (headers ? 1 : 0)
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChange(key, value) {
    this.setState({
      [key]: value
    })
  }

  _handleDone() {
    const { parsed, delimiter, headers, quote } = this.state
    const { asset } = this.props
    const parse = { delimiter, headers, quote }
    this.props.onDone(asset, parse, parsed.headers)
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

  _handleMatch() {
    const { asset } = this.props
    if(asset.file_name.match(/\.csv$/)) {
      this.setState({ delimiter: ',' })
    } else if(asset.file_name.match(/\.tsv$/)) {
      this.setState({ delimiter: '\t' })
    }
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
