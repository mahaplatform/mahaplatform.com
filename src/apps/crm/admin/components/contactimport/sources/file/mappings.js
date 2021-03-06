import { Button, Container, Loader, ModalPanel } from '@admin'
import PropTypes from 'prop-types'
import Mapping from './mapping'
import React from 'react'
import _ from 'lodash'

const fieldmap = [
  { name: 'organization', matches: ['organization','company','business','organizationname','companyname','businessname','organization1','company1','business1'] },
  { name: 'last_first', matches: ['lastfirst'] },
  { name: 'first_name', matches: ['first','firstname','fname','givenname'] },
  { name: 'last_name', matches: ['last','lastname','lastnames','lname','surname'] },
  { name: 'full_name', matches: ['name','fullname'] },
  { name: 'photo', matches: ['photo','picture'] },
  { name: 'spouse', matches: ['spouse'] },
  { name: 'birthday', matches: ['birthday'] },
  { name: 'position', matches: ['job','position','title','jobtitle'] },
  { name: 'email_1', matches: ['email','emailaddress','email1','primaryemail'] },
  { name: 'email_2', matches: ['email2','secondaryemail'] },
  { name: 'email_3', matches: ['email3'] },
  { name: 'phone_1', matches: ['phone','phonenumber','phone1','primaryphone'] },
  { name: 'phone_2', matches: ['phone2','secondaryphone'] },
  { name: 'phone_3', matches: ['phone3','secondaryphone'] },
  { name: 'address_1', matches: ['address','address1'] },
  { name: 'address_1_street_1', matches: ['street','street1'] },
  { name: 'address_1_street_2', matches: ['street2'] },
  { name: 'address_1_city', matches: ['city'] },
  { name: 'address_1_state_province', matches: ['state','province','stateprovince'] },
  { name: 'address_1_postal_code', matches: ['zip','zipcode','postalcode','postal'] },
  { name: 'address_2', matches: ['address2'] },
  { name: 'address_3', matches: ['address3'] }
]

class Mappings extends React.PureComponent {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    asset: PropTypes.object,
    fields: PropTypes.array,
    parse: PropTypes.object,
    headers: PropTypes.array,
    onBack: PropTypes.func,
    onDone: PropTypes.func,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  state = {
    mappings: null
  }

  _handleBack = this._handleBack.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleMap = this._handleMap.bind(this)
  _handleMapping = this._handleMapping.bind(this)

  render() {
    const { mappings } = this.state
    if(!mappings) return <Loader />
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="import-mappings">
          <table className="ui unstackable table">
            <thead>
              <tr>
                <th>Column</th>
                <th>Field</th>
                <th className="collapsing"></th>
                <th className="collapsing"></th>
              </tr>
            </thead>
            <tbody>
              { mappings.map((mapping, index) => (
                <tr key={`item_${index}`}>
                  <td>
                    { typeof mapping.header === 'number' ? `Column ${mapping.header + 1}` : (mapping.header || 'NO HEADER') }
                  </td>
                  <td>
                    { mapping.field ? this._getFieldLabel(mapping.field) : <span className="alert">UNMAPPED</span> }
                  </td>
                  <td>
                    <Button { ...this._getEdit(mapping) } />
                  </td>
                  <td>
                    <Button { ...this._getRemove(index) } />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    this._handleInitialMappings()
  }

  _getEdit(mapping) {
    return {
      icon: 'pencil',
      className: '',
      handler: this._handleMapping.bind(this, mapping)
    }
  }

  _getRemove(index) {
    return {
      icon: 'times',
      className: '',
      handler: this._handleRemove.bind(this, index)
    }
  }

  _getFields() {
    const { fields } = this.props
    return fields.reduce((fields, segments) => [
      ...fields,
      ...segments.fields
    ], [])
  }

  _getFieldLabel(name) {
    const fields = this._getFields()
    const field = _.find(fields, { name })
    return field.label
  }

  _getMapped() {
    const { mappings } = this.state
    return mappings.filter(mapping => {
      return mapping.field !== null
    })
  }

  _getMapping(mapping) {
    const { fields, onPop } = this.props
    const { mappings } = this.state
    return {
      fields,
      mappings,
      mapping,
      onBack: onPop,
      onDone: this._handleMap.bind(this, mapping.header)
    }
  }

  _getPanel() {
    const mapped = this._getMapped()
    return {
      title: 'Map Columns',
      instructions: `In order to translate your data into valid contact
        records, you must first map the columns from your data to fields in
        the CRM. We've done our best to guess the mapping based upon the
        column names. Please map as many columns as you can below (data from
        unmapped columns will be ignored)`,
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ],
      rightItems: mapped.length > 0 ? [
        { label: 'Next', handler: this._handleDone }
      ] : null
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleDone() {
    const { asset, parse } = this.props
    const { mappings } = this.state
    this.props.onDone(asset, {
      asset_id: asset.id,
      headers: parse.headers,
      delimiter: parse.delimiter,
      mapping: mappings
    })
  }

  _handleInitialMappings() {
    const { headers } = this.props
    const mappings = headers.map(header => {
      if(!header || _.isInteger(header)) return { header, field: null, type: null }
      const text = header.replace(/[^A-Za-z0-9]/g, '').toLowerCase().replace(/^(contact|customer|user)/g,'')
      const field = fieldmap.find(item => {
        return item.matches.find(match => {
          return new RegExp(match).test(text)
        }) !== undefined
      })
      const name = field ? field.name : null
      return this._getDefaultMapping(header, name)
    })
    this.setState({ mappings })
  }

  _getDefaultMapping(header, name) {
    const fields = this._getFields()
    const field = _.find(fields, { name })
    if(!field) return { header, field: null, type: null }
    return {
      header,
      field: field ? name : null,
      type: field ? field.type : null
    }
  }

  _handleMapping(mapping) {
    this.props.onPush(Mapping, this._getMapping(mapping))
  }

  _handleMap(key, value) {
    const { mappings } = this.state
    this.setState({
      mappings: [
        ...mappings.map(mapping => ({
          ...mapping,
          ...mapping.header === key ? value : {}
        }))
      ]
    })
    this.props.onPop()
  }

  _handleRemove(index) {
    const { mappings } = this.state
    this.setState({
      mappings: [
        ...mappings.map((mapping, i) => {
          return i == index ? {
            field: null,
            header: mapping.header,
            type: null
          } : mapping
        })
      ]
    })
  }

}

const mapResources = (props, context) => ({
  fields: '/api/admin/crm/imports/fields'
})

export default Container(mapResources)(Mappings)
