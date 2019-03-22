import { ModalPanel, Dropdown } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Field extends React.Component {

  static contextTypes = {
  }

  static propTypes = {
    availableFields: PropTypes.array,
    config: PropTypes.object,
    control: PropTypes.object,
    defaultValue: PropTypes.object,
    fields: PropTypes.array,
    header: PropTypes.string,
    index: PropTypes.number,
    mapped: PropTypes.array,
    status: PropTypes.string,
    table: PropTypes.string,
    table_fields: PropTypes.array,
    relation_columns: PropTypes.array,
    onBack: PropTypes.func,
    onDone: PropTypes.func,
    onChange: PropTypes.func,
    onGetFields: PropTypes.func,
    onGetRelationColumns: PropTypes.func,
    onSetConfig: PropTypes.func,
    onUpdateConfig: PropTypes.func
  }

  _handleDone = this._handleDone.bind(this)
  _handleFieldName = this._handleFieldName.bind(this)
  _handleFieldType = this._handleFieldType.bind(this)
  _handleFieldRelation = this._handleFieldRelation.bind(this)
  _handleRelationColumns = this._handleRelationColumns.bind(this)

  render() {
    const { config, status, table_fields, relation_columns } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        { status === 'ready' &&
          <div className="maha-import-field">
            <div className="maha-import-field-row">
              <div className="maha-import-field-label">
                Column Name:
              </div>
              <div className="maha-import-field-value">
                { config.header }
              </div>
            </div>
            <div className="maha-import-field-row">
              <div className="maha-import-field-label">
                Field Name:
              </div>
              <div className="maha-import-field-value">
                <Dropdown { ...this._getFieldName() } />
              </div>
            </div>
            <div className="maha-import-field-row">
              <div className="maha-import-field-label">
                Field Type:
              </div>
              <div className="maha-import-field-value">
                <Dropdown { ...this._getFieldType() } />
              </div>
            </div>
            { config.type === 'relation' && table_fields &&
              <div className="maha-import-field-row">
                <div className="maha-import-field-label">
                  Linked Table:
                </div>
                <div className="maha-import-field-value">
                  <Dropdown { ...this._getFieldRelation() } />
                </div>
              </div>
            }
            { config.relation && relation_columns &&
              <div className="maha-import-field-row">
                <div className="maha-import-field-label">
                  Field to Match:
                </div>
                <div className="maha-import-field-value">
                  <Dropdown { ...this._getRelationColumns() } />
                </div>
              </div>
            }
          </div>
        }
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { defaultValue, onSetConfig, onGetFields, table } = this.props
    onSetConfig(defaultValue)
    onGetFields(table)
  }

  componentDidUpdate(prevProps){
    const { onGetRelationColumns, config, relation_columns } = this.props

    if(!_.isEqual(this.props.config, prevProps.config) && !prevProps.config) {
      onGetRelationColumns(config.relation)
    }
  }

  _getPanel() {
    return {
      title: 'Configure Field',
      rightItems: [
        {label: 'Done', handler: this._handleDone }
      ]
    }
  }

  _getFieldName() {
    const { control, availableFields } = this.props
    return {
      options: availableFields.map((field, index) => ({
        value: field.name,
        text: field.label
      })),
      defaultValue: (control) ? control.name : null,
      onChange: this._handleFieldName
    }
  }

  _getFieldType() {
    const { config } = this.props
    return {
      options: [
        {
          value: 'text',
          text: 'Text'
        },
        {
          value: 'upload',
          text: 'Image or file upload'
        },
        {
          value: 'relation',
          text: 'Relation to another table'
        }
      ],
      defaultValue: (config) ? config.type : 'text',
      onChange: this._handleFieldType
    }
  }

  _getFieldRelation(){
    const { config, table_fields } = this.props

    const simplify = (string) => {
      if(string.endsWith('_id')) string = string.substring(0, string.length - 3)
      if(string.endsWith('s')) string = string.substring(0, string.length - 1)
      if(string.indexOf('_') != -1) string = string.split('_')[1]
      return string.replace(/_/g, '').replace(/ /g, '').replace(/[^\w\s]/gi, '').toLowerCase()
    }

    const guessFieldRelation = (config) => table_fields.reduce((found, field) => {
      if(found) return found
      if(config.relation) return config.relation
      if(field.related){
        if(field.related.table === config.field) return field.related.table
        if(simplify(field.related.table) === simplify(config.field)) return field.related.table
      }
      return null
    }, null)

    return {
      options: table_fields.reduce((options, field) => {
        if(field.related){
          options.push({
            value: field.related.table,
            text: field.related.table
          })
        }
        return options
      }, [] ),
      defaultValue: (config) ? guessFieldRelation(config) :  null,
      onChange: this._handleFieldRelation
    }
  }

  _getRelationColumns(){
    const { config, relation_columns } = this.props

    const guessRelationColumns = (config) => relation_columns.reduce((found, field) => {
      if(found) return found
      if(config.relation_column) return config.relation_column
      if(field.name === 'name') return field.name
      if(field.name === 'title') return field.name
      if(field.name === 'email') return field.name
      return null
    }, null)
    return {
      options: relation_columns.reduce((options, field) => {
        options.push({
          value: field.name,
          text: field.name
        })
        return options
      }, [] ),
      defaultValue: (config) ? guessRelationColumns(config) : null,
      onChange: this._handleRelationColumns
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleDone() {
    const { index, config } = this.props
    this.props.onDone(config, index)
  }

  _handleFieldName(field) {
    this.props.onUpdateConfig({ field })
  }

  _handleFieldType(type){
    this.props.onUpdateConfig({ type })
  }

  _handleFieldRelation(relation){
    this.props.onUpdateConfig({ relation })
  }

  _handleRelationColumns(relationcolumn){
    this.props.onUpdateConfig({ relationcolumn })
  }

}


export default Field
