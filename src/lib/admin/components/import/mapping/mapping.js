import ModalPanel from '../../modal_panel'
import PropTypes from 'prop-types'
import Button from '../../button'
import Field from '../field'
import React from 'react'
import _ from 'lodash'

class Mapping extends React.Component {

  static contextTypes = {
  }

  static propTypes = {
    defaultValue: PropTypes.object,
    fields: PropTypes.array,
    import: PropTypes.object,
    isValid: PropTypes.bool,
    mapping: PropTypes.array,
    mapped: PropTypes.array,
    status: PropTypes.string,
    unmapped: PropTypes.array,
    onBack: PropTypes.func,
    onDone: PropTypes.func,
    onField: PropTypes.func,
    onInit: PropTypes.func,
    onPushCard: PropTypes.func,
    onUpdateImport: PropTypes.func,
    onUpdateMapping: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleClick = this._handleClick.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleFieldDone = this._handleFieldDone.bind(this)


  render() {
    const { mapping, isValid } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        { mapping &&
          <div className="import-mapping">
            { !isValid &&
              <div className="import-mapping-warning">
                <i className="fa fa-fw fa-exclamation-triangle"></i>
                You cannot proceed until all required database fields have
                been matched to an import column
              </div>
            }
            <table className="ui table">
              <thead>
                <tr>
                  <th>Header</th>
                  <th>Field</th>
                  <th className="collapsing"></th>
                </tr>
              </thead>
              <tbody>
                { mapping.map((item, index) => (
                  <tr key={`item_${index}`} onClick={ this._handleClick }>
                    <td>
                      <div className="token">
                        { typeof header === 'number' ? `Column ${item.header + 1}` : item.header }
                      </div>
                    </td>
                    <td>{ item.field }</td>
                    <td><Button { ...this._getButton() } /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { defaultValue, onInit } = this.props
    onInit(defaultValue)
  }

  componentDidUpdate(prevProps) {
    const { mapping, onUpdateImport } = this.props
    if(!_.isEqual(mapping, prevProps.mapping) && prevProps.mapping !== null) {
      onUpdateImport(this.props.import.id, { mapping })
    }
    if(!_.isEqual(this.props.import, prevProps.import) && prevProps.import !== null) {
      if(this.props.import.stage !== 'configuring') return
      this.props.onDone(this.props.import)
    }
  }

  _getButton(){
    return {
      label: 'Configure'
    }
  }

  _getField(mappingItem, index) {
    return {
      index,
      defaultValue: mappingItem,
      table: this.props.import.object_type,
      fields: this.props.fields,
      mapped: this.props.mapped,
      onBack: this._handleBack,
      onDone: this._handleFieldDone
    }
  }

  _getPanel() {
    const { isValid } = this.props
    return {
      title: 'Map Fields',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ],
      rightItems: isValid ? [
        { label: 'Next', handler: this._handleDone }
      ] : []
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handlePush(Component, config) {
    this.props.onPushCard(Component, config)
  }

  _handleClick(mappingItem, index) {
    this._handlePush(Field, this._getField.bind(this, mappingItem, index))
  }

  _handleFieldDone(mappingItem, index) {
    this.props.onUpdateMapping(mappingItem, index)
    this.props.onBack()
  }

  _handleDone() {
    const stage = 'configuring'
    this.props.onUpdateImport(this.props.import.id, { stage })
  }

}

export default Mapping
