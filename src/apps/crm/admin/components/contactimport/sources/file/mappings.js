import { Container, Loader, ModalPanel } from 'maha-admin'
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
              <th>Header</th>
              <th>Field</th>
              <th className="collapsing"></th>
            </tr>
          </thead>
          <tbody>
            { mappings.map((mapping, index) => (
              <tr key={`item_${index}`} onClick={ this._handleMapping.bind(this, mapping) }>
                <td>
                  { typeof mapping.header === 'number' ? `Column ${mapping.header + 1}` : mapping.header }
                </td>
                <td>{ mapping.field }</td>
                <td><i className="fa fa-chevron-right" /></td>
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

  _getMapping(mapping) {
    const { onPop } = this.props
    return {
      mapping,
      options: this._getOptions(mapping.field),
      onBack: onPop,
      onDone: this._handleMap.bind(this, mapping.header)
    }
  }

  _getOptions(current) {
    const { fields } = this.props
    const { mappings } = this.state
    return fields.filter(field => {
      return Object.values(mappings).find(mapping => {
        return mapping.field !== current && mapping.field === field
      }) === undefined
    })
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
    this.props.onDone({
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
      if(_.includes(['firstname','fname'], text)) {
        return { header, field: 'first_name', type: 'text' }
      } else if(_.includes(['lastname','lname'], text)) {
        return { header, field: 'last_name', type: 'text' }
      } else if(_.includes(['lastname','lname'], text)) {
        return { header, field: 'last_name', type: 'text' }
      } else if(_.includes(['email','emailaddress'], text)) {
        return { header, field: 'email', type: 'email' }
      } else if(_.includes(['phone','phonenumber'], text)) {
        return { header, field: 'phone', type: 'phone' }
      } else if(_.includes(['street','street1'], text)) {
        return { header, field: 'street_1', type: 'text' }
      } else if(_.includes(['street2'], text)) {
        return { header, field: 'street_2', type: 'text' }
      } else if(_.includes(['city'], text)) {
        return { header, field: 'city', type: 'text' }
      } else if(_.includes(['state','province','stateprovince'], text)) {
        return { header, field: 'state_province', type: 'text' }
      } else if(_.includes(['zip','zipcode','postalcode'], text)) {
        return { header, field: 'postal_code', type: 'text' }
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
