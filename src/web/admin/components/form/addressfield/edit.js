import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Form from '../../form'
import React from 'react'
import _ from 'lodash'

class Edit extends React.Component {

  static propTypes = {
    value: PropTypes.object,
    onCancel: PropTypes.func,
    onDone: PropTypes.func
  }

  state = {
    value: null
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  componentDidMount() {
    const { value } = this.props
    this.setState({ value })
  }

  _getForm() {
    const { value } = this.state
    if(!value) return null
    return {
      title: 'Edit Address',
      onCancel: this._handleCancel,
      onChange: this._handleChange,
      cancelIcon: 'chevron-left',
      saveText: null,
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleDone }
      ],
      sections: [
        {
          fields: [
            { label: 'Street 1', name: 'street_1', type: 'textfield', defaultValue: value.street_1 },
            { label: 'Street 2', name: 'street_2', type: 'textfield', defaultValue: value.street_2 },
            { label: 'City', name: 'city', type: 'textfield', defaultValue: value.city },
            { label: 'State/Province', name: 'state_province', type: 'textfield', defaultValue: value.state_province },
            { label: 'Postal Code', name: 'postal_code', type: 'textfield', defaultValue: value.postal_code },
            { label: 'County', name: 'county', type: 'textfield', defaultValue: value.county },
            { label: 'Country', name: 'country', type: 'textfield', defaultValue: value.country }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChange(value) {
    this.setState({ value })
  }

  _handleDone() {
    const { value } = this.state
    const { street_1, street_2, city, state_province, postal_code } = value
    const description = [street_1, street_2, city, state_province, postal_code].filter(item => {
      return !_.isNil(item)
    }).join(', ')
    this.props.onDone({
      ...value,
      description
    })
  }

}

const mapStateToProps = (state, props) => state.maha.addressfield[props.cid]

export default connect(mapStateToProps)(Edit)
