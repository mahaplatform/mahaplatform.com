import RulesField from '../../rulesfield'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

class Rules extends React.Component {

  static propTypes = {
    cid: PropTypes.string,
    config: PropTypes.object,
    onUpdate: PropTypes.func
  }

  state = {
    rules: null
  }

  _handleChange = this._handleChange.bind(this)

  render() {
    if(!this.state.rules) return null
    return <Form { ...this._getForm() } />
  }

  componentDidMount() {
    const { config } = this.props
    this.setState({
      rules: _.get(config, 'rules.rules') || []
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { rules } = this.state
    if(!_.isEqual(rules, prevState.rules)) {
      this.props.onUpdate('rules', rules)
    }
  }

  _getForm() {
    const { rules } = this.state
    return {
      showHeader: false,
      onChange: this._handleChange,
      sections: [
        {
          fields: [
            { name: 'rules', type: RulesField, fields: this._getFields(), defaultValue: rules }
          ]
        }
      ]
    }
  }

  _getFields() {
    const { fields } = this.props.config
    return fields.filter(field => {
      return field.type !== 'text' && field.name
    }).map(field => ({
      code: field.code,
      name: field.name.value,
      type: _.get(field, 'contactfield.type') || field.type,
      options: field.options
    }))
  }

  _handleChange(rules) {
    this.setState({ rules })
  }

}

const mapStateToProps = (state, props) => ({
  config: state.crm.form_designer[props.cid].config
})

export default connect(mapStateToProps)(Rules)
