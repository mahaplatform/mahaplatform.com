import { Button, Container, Loader, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import Mapping from './mapping'
import React from 'react'
import _ from 'lodash'

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
                <td>{ this._getFieldLabel(mapping.field) }</td>
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
    const { mappings } = this.state
    const mapped = mappings.find(mapping => {
      return mapping.field === null
    }) === undefined
    return {
      title: 'Map Columns',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ],
      rightItems: mapped ? [
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
      const text = header.replace(/[\s-_']/g, '').toLowerCase()
      if(_.includes(['name','fullname'], text)) {
        return { header, field: 'full_name', type: 'text' }
      } else if(_.includes(['firstname','fname','givenname'], text)) {
        return { header, field: 'first_name', type: 'text' }
      } else if(_.includes(['lastname','lname','surname'], text)) {
        return { header, field: 'last_name', type: 'text' }
      } else if(_.includes(['lastname','lname'], text)) {
        return { header, field: 'last_name', type: 'text' }
      } else if(_.includes(['email','emailaddress'], text)) {
        return { header, field: 'email_1', type: 'email' }
      } else if(_.includes(['phone','phonenumber'], text)) {
        return { header, field: 'phone_1', type: 'phone' }
      } else if(_.includes(['address','address1'], text)) {
        return { header, field: 'address_1', type: 'address' }
      } else if(_.includes(['street','street1'], text)) {
        return { header, field: 'address_1_street_1', type: 'text' }
      } else if(_.includes(['street2','address2'], text)) {
        return { header, field: 'address_1_street_2', type: 'text' }
      } else if(_.includes(['city'], text)) {
        return { header, field: 'address_1_city', type: 'text' }
      } else if(_.includes(['state','province','stateprovince'], text)) {
        return { header, field: 'address_1_state_province', type: 'text' }
      } else if(_.includes(['zip','zipcode','postalcode'], text)) {
        return { header, field: 'address_1_postal_code', type: 'text' }
      } else {
        return { header, field: null, type: null }
      }
    })
    this.setState({ mappings })
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
