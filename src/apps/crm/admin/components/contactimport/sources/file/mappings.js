import { Button, Container, Loader, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import Mapping from './mapping'
import React from 'react'
import _ from 'lodash'

const fieldmap = [
  { name: 'full_name', matches: ['name','fullname'] },
  { name: 'first_name', matches: ['firstname','fname','givenname'] },
  { name: 'last_name', matches: ['lastname','lname','surname'] },
  { name: 'photo', matches: ['photo','picture'] },
  { name: 'spouse', matches: ['spouse'] },
  { name: 'birthday', matches: ['birthday'] },
  { name: 'organization_1', matches: ['organization','company'] },
  { name: 'email_1', matches: ['email','emailaddress','email1'] },
  { name: 'email_2', matches: ['email2'] },
  { name: 'phone_1', matches: ['phone','phonenumber','phone1'] },
  { name: 'phone_2', matches: ['phone2'] },
  { name: 'address_1', matches: ['address','address1'] },
  { name: 'address_1_street_1', matches: ['street','street1'] },
  { name: 'address_1_street_2', matches: ['street2'] },
  { name: 'address_1_city', matches: ['city'] },
  { name: 'address_1_state_province', matches: ['state','province','stateprovince'] },
  { name: 'address_1_postal_code', matches: ['zip','zipcode','postalcode'] }
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
        <table className="ui unstackable table">
          <thead>
            <tr>
              <th>Column</th>
              <th>Field</th>
              <th className="collapsing"></th>
            </tr>
          </thead>
          <tbody>
            { mappings.map((mapping, index) => (
              <tr key={`item_${index}`}>
                <td>
                  { typeof mapping.header === 'number' ? `Column ${mapping.header + 1}` : mapping.header }
                </td>
                <td>
                  { mapping.field && this._getFieldLabel(mapping.field) }
                </td>
                <td>
                  <Button { ...this._getButton(mapping) } />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ModalPanel>
    )
  }

  componentDidMount() {
    this._handleInitialMappings()
  }

  _getButton(mapping) {
    return {
      label: 'Edit',
      className: 'ui mini fluid button',
      handler: this._handleMapping.bind(this, mapping)
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
      rightItems: [
        { label: 'Next', handler: this._handleDone }
      ]
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
      if(_.isInteger(header)) return { header, field: null, type: null }
      const text = header.replace(/[\s-_']/g, '').toLowerCase()
      const field = fieldmap.find(item => {
        return _.includes(item.matches, text)
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

}

const mapResources = (props, context) => ({
  fields: '/api/admin/crm/imports/fields'
})

export default Container(mapResources)(Mappings)
