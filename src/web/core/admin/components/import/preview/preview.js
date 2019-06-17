import Loader from '../../loader'
import Message from '../../message'
import ModalPanel from '../../modal_panel'
import PropTypes from 'prop-types'
import Chooser from './chooser'
import React from 'react'
import _ from 'lodash'

class Preview extends React.Component {

  static propTypes = {
    defaultMapping: PropTypes.array,
    defaultValue: PropTypes.object,
    delimiter: PropTypes.string,
    fields: PropTypes.array,
    headers: PropTypes.bool,
    import: PropTypes.object,
    index: PropTypes.number,
    parsed: PropTypes.object,
    record: PropTypes.array,
    rowNumber: PropTypes.number,
    status: PropTypes.string,
    table: PropTypes.array,
    table_fields: PropTypes.array,
    onBack: PropTypes.func,
    onDone: PropTypes.func,
    onGetFields: PropTypes.func,
    onGetTables: PropTypes.func,
    onInit: PropTypes.func,
    onNext: PropTypes.func,
    onPreviewData: PropTypes.func,
    onPrevious: PropTypes.func,
    onUpdateImport: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleChangeDelimiter = this._handleChangeDelimiter.bind(this)
  _handleChangeHeaders = this._handleChangeHeaders.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleNext = this._handleNext.bind(this)
  _handlePrevious = this._handlePrevious.bind(this)

  render() {
    const { index, parsed, record, rowNumber, status } = this.props
    if(!this.props.import) return null
    const imp = this.props.import
    return (
      <ModalPanel { ...this._getPanel() }>
        { record &&
          <div className="maha-import-preview">
            <div className="maha-import-preview-header">
              { imp.asset.content_type.match(/csv/) &&
                <div className="maha-import-preview-header-item">
                  <Chooser { ...this._getDelimiter() } />
                </div>
              }
              <div className="maha-import-preview-header-item">
                <Chooser { ...this._getHeaders() } />
              </div>
            </div>
            { status === 'loading' && <Loader { ...this._getLoader() } /> }
            { status === 'failure' && <Message { ...this._getFailure() } /> }
            { (status === 'loaded' || status === 'saving') &&
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
            }
          </div>
        }
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { defaultValue, onInit, onGetFields, onGetTables } = this.props
    onInit(defaultValue)
    onGetFields(defaultValue.object_type)
    onGetTables(defaultValue.object_type)
  }

  componentDidUpdate(prevProps) {
    const { delimiter, headers, status, onDone } = this.props
    if(!_.isEqual(this.props.import, prevProps.import) && !prevProps.import) {
      this.props.onPreviewData(this.props.import.id, delimiter, headers)
    }
    if(status !== prevProps.status && status === 'saved') {
      onDone(this.props.import)
    }
  }

  _getPanel() {
    const { status } = this.props
    const panel = {
      title: 'Preview Data',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
    if(status !== 'failed') {
      panel.rightItems = [
        { label: 'Next', handler: this._handleDone }
      ]
    }

    return panel
  }

  _getLoader() {
    return {
      label: 'Parsing your data...'
    }
  }

  _getFailure() {
    return {
      icon: 'exclamation-triangle',
      title: 'Preview failed',
      text: 'Unable to parse your data'
    }
  }

  _getDelimiter() {
    const { delimiter } = this.props
    return {
      defaultValue: delimiter,
      options: [
        { key: ',', value: 'Comma' },
        { key: "\t", value: 'Tab' },
        { key: "\s", value: 'Space' },
        { key: ':', value: 'Colon' },
        { key: '|', value: 'Pipe' }
      ],
      onChange: this._handleChangeDelimiter
    }
  }

  _getHeaders() {
    const { headers } = this.props
    return {
      defaultValue: headers,
      options: [
        { key: true, value: 'Headers' },
        { key: false, value: 'No Headers' }
      ],
      onChange: this._handleChangeHeaders
    }
  }

  _getInitialMapping() {
    const { fields, parsed, table_fields, tables } = this.props

    const simplify = (string) => {
      if(!string) return null
      if(_.endsWith(string, '_code')) string = string.replace('_code','')
      if(_.endsWith(string, '_id')) string = string.replace('_id','')
      if(_.endsWith(string, '_number')) string = string.replace('_number','')
      if(_.endsWith(string, 's')) string = string.substring(0, string.length-1)
      return string.replace(/_/g, '').replace(/ /g, '').replace(/[^\w\s]/gi, '').toLowerCase()
    }

    const guessName = (header) => fields.reduce((found, field) => {
      if(found) return found
      if(simplify(field.name) === simplify(header)) return field.name
      if(simplify(field.label) === simplify(header)) return field.name
      return null
    }, null)

    const guessType = (header) => table_fields.reduce((found, field) => {
      if(found) return found
      if(simplify(header).match(/photo|image|logo/)){
        return 'upload'
      }
      if((simplify(field.name) === simplify(header)) || (simplify(field.label) === simplify(header))){
        if(field.related) return 'relation'
        if(field.data_type) return field.data_type
      }
      return null
    }, null)

    const all_table_fields = tables.reduce((all_table_fields, row) => ({
      ...all_table_fields,
      [row.table]: [
        ...all_table_fields[row.table] || [],
        row.field
      ]
    }), {})

    const guessRelation = (header) => Object.keys(all_table_fields).reduce((found, table) => {
      if(found) return found
      if(simplify(header) === simplify(_.split(table, '_')[1])){
        return table
      }
      return null
    }, null)

    const guessRelationColumn = (relation) => {
      //TODO If no name or title, find the first 'text' column in the table and select it
      if(  _.includes(all_table_fields[relation], 'name') ) return 'name'
      if(  _.includes(all_table_fields[relation], 'title') ) return 'title'
      if(  _.includes(all_table_fields[relation], 'email') ) return 'email'
      return null
    }

    return parsed.headers.map(header => ({
      header,
      field: guessName(header),
      type: (guessType(header)) ? guessType(header) : 'text',
      relation: guessRelation(header),
      relation_columns: guessRelationColumn(guessRelation(header))
    }))
  }

  _getNormalizedMapping() {
    const { defaultMapping, parsed } = this.props
    const simplify = (string) => {
      if(string.endsWith('_id')) string = string.replace('_id','')
      if(string.endsWith('_code')) string = string.replace('_code','')
      return string.replace(/_/g, '').replace(/ /g, '').replace(/[^\w\s]/gi, '').toLowerCase()
    }
    return parsed.headers.map(header => {
      return defaultMapping.find(mapping => {
        return simplify(mapping.header) === simplify(header)
      })
    })
  }

  _checkIfContainsAllFields() {
    const { parsed, defaultMapping } = this.props
    if(!defaultMapping) return false
    const simplify = (string) => {
      if(string.endsWith('_id')) string = string.replace('_id','')
      if(string.endsWith('_code')) string = string.replace('_code','')
      return string.replace(/_/g, '').replace(/ /g, '').replace(/[^\w\s]/gi, '').toLowerCase()
    }
    const simplifiedHeaders = parsed.headers.map(header => simplify(header))
    return defaultMapping.reduce((mismatch, mapping) => {
      return mismatch || _.includes(simplifiedHeaders, simplify(mapping.header))
    }, false)
  }

  _handleChangeDelimiter(delimiter) {
    const { headers } = this.props
    this.props.onPreviewData(this.props.import.id, delimiter, headers)
  }

  _handleChangeHeaders(headers) {
    const { delimiter } = this.props
    this.props.onPreviewData(this.props.import.id, delimiter, headers)
  }

  _handlePrevious() {
    this.props.onPrevious()
  }

  _handleNext() {
    this.props.onNext()
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleDone() {
    const { headers, delimiter, onUpdateImport } = this.props
    onUpdateImport(this.props.import.id, {
      mapping: (this._checkIfContainsAllFields()) ? this._getNormalizedMapping() : this._getInitialMapping(),
      stage: (this._checkIfContainsAllFields()) ? 'configuring' : 'mapping',
      headers,
      delimiter
    })
  }

}

export default Preview
