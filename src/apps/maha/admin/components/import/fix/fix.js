import { ModalPanel, Form, Button, Loader } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Fix extends React.Component {

  static propTypes = {
    do: PropTypes.string,
    defaultValue: PropTypes.object,
    index: PropTypes.number,
    import: PropTypes.object,
    import_items: PropTypes.array,
    fields: PropTypes.array,
    record: PropTypes.array,
    rules: PropTypes.object,
    status: PropTypes.string,
    onBack: PropTypes.func,
    onFetch: PropTypes.func,
    onInit: PropTypes.func,
    onNext: PropTypes.func,
    onPrevious: PropTypes.func
  }

  static defaultValues = {
    do:''
  }

  static contextTypes = {
    modal: PropTypes.object,
    network:PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleFetchImportItems = this._handleFetchImportItems.bind(this)
  _handlePrevious = this._handlePrevious.bind(this)
  _handleNext = this._handleNext.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    const { index, import_items, status } = this.props
    const record = (import_items) ? import_items[index] : null
    return (
      <ModalPanel { ...this._getPanel() }>
        { record &&
          <div className="maha-import-review">
            { status === 'loading' && <Loader { ...this._getLoader() } /> }
            { (status === 'loaded' || status === 'success') &&
              <div>
                <div className="maha-import-review-pager">
                  <div className="maha-import-review-pager-item">
                    { index > 0 ?
                      <div className="ui green tiny fluid button" onClick={ this._handlePrevious }>
                        <i className="fa fa-fw fa-chevron-left" />
                      </div> :
                      <div className="ui tiny fluid button disabled">
                        <i className="fa fa-fw fa-chevron-left" />
                      </div>
                    }
                  </div>
                  <div className="maha-import-review-pager-item">
                    <label>Record Number: { index+1 } of { import_items.length-1 }</label>
                  </div>
                  <div className="maha-import-review-pager-item">
                    { index < import_items.length - 1 ?
                      <div className="ui green tiny fluid button" onClick={ this._handleNext }>
                        <i className="fa fa-fw fa-chevron-right" />
                      </div> :
                      <div className="ui tiny fluid button disabled">
                        <i className="fa fa-fw fa-chevron-right" />
                      </div>
                    }
                  </div>
                </div>
                <div className="maha-import-review-body">
                  <table className="maha-import-preview-record">
                    <tbody>
                      { _.map(record.values, (value, key) => (
                        <tr key={`property_${key}`}>
                          <th>{ key }</th>
                          <td>{ value }</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="button-row">
                    <Button { ...this._getSkipRecordButton(record.id) } />
                    <Button { ...this._getEditRecordButton(record.id) } />
                  </div>
                </div>
              </div>
            }
          </div>
        }
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { onFetch, onInit, defaultValue } = this.props
    onInit( defaultValue )
    onFetch( defaultValue.id )
  }

  componentWillUnmount() {
    const { status, import_items } = this.props
    this._handleLeave()
  }

  componentDidUpdate(prevProps){
    if(this.props.import && prevProps.import === null){
      this._handleJoin()
    }
    if( this.props.do == 'next' ){
      this.props.onClearDo()
      this._handleNext()
    }

  }

  _getEditRecordButton(recordId) {
    return {
      label: 'Edit Record',
      handler: this._handleEditRecordButton.bind(this, recordId)
    }
  }

  _getSkipRecordButton(recordId) {
    return {
      label: 'Skip Record',
      handler: this._handleSkipRecordButton.bind(this, recordId)
    }
  }

  _handleEditRecordButton(recordId){
    this.context.modal.push( () => <Form { ...this._getForm(recordId) } /> )
  }

  _handleSkipRecordButton(recordId){
    this.props.onOmitRecord(this.props.import.id, recordId)
  }

  _getForm(recordId) {
    return {
      title: 'Edit Import Record',
      method: 'patch',
      endpoint: `/api/admin/imports/${this.props.import.id}/items/${recordId}/edit`,
      action: `/api/admin/imports/${this.props.import.id}/items/${recordId}/fix`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            ...this.props.fields.map((field) => ({
              ...field,
              name:'values.'+field.name
            })),
            {
              name: 'rules',
              type: 'hidden',
              defaultValue: Object.keys(this.props.rules).reduce((rules, key) => ({
                ...rules,
                [`values.${key}`]: this.props.rules[key]
              }), {})
            }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.pop()
  }

  _handleSuccess() {
    this.context.modal.pop()
    this.props.onIndexReset()
  }

  _getPanel() {
    return {
      title: 'Fix Records with Errors',
      rightItems: [
        { label: 'Done', handler: this._handleDone }
      ]
    }
  }

  _getLoader() {
    return {
      label: 'Loading invalid records...'
    }
  }

  _handleJoin() {
    const { network } = this.context
    const channel = `/admin/imports/${this.props.import.id}`
    network.join(channel)
    network.subscribe([
      { target: channel, action: 'refresh', handler: this._handleFetchImportItems }
    ])
  }

  _handleLeave() {
    const { network } = this.context
    const channel = `/admin/imports/${this.props.import.id}`
    network.leave(channel)
    network.unsubscribe([
      { target: channel, action: 'refresh', handler: this._handleFetchImportItems }
    ])
  }

  _handleFetchImportItems() {
    const { onFetch } = this.props
    onFetch( this.props.import.id )
  }

  _handleDone() {
    this.props.onBack()
  }

  _handlePrevious() {
    const { onPrevious } = this.props
    onPrevious()
  }

  _handleNext() {
    const { onNext, index } = this.props
    if( this.props.import.error_count > 0 ){
      onNext()
    } else {
      this.props.onBack()
    }
  }

}

export default Fix
