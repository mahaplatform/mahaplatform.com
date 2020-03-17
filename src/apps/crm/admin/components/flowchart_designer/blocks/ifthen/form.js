import ValuesField from '../../../valuesfield'
import VariableField from './variablefield'
import BranchesField from './branchesfield'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class IfThen extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
    fields: PropTypes.array,
    program: PropTypes.object,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onDone: PropTypes.func,
    onTokens: PropTypes.func
  }

  form = null

  state = {
    config: {}
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  componentDidMount() {
    const { config } = this.props
    this.setState({
      config: {
        ...this._getDefault(),
        ...config ? {
          ...config,
          branches: config.strategy === 'criteria' ? config.branches : [],
          values: config.strategy === 'variable' ? config.branches : []
        } : {}
      }
    })
  }

  _getDefault() {
    return {
      strategy: 'variable',
      branches: [],
      values: [],
      variable: null
    }
  }

  _getForm() {
    const { config } = this.state
    return {
      reference: node => this.form = node,
      title: 'If / Then',
      onCancel: this._handleCancel,
      onChange: this._handleChange,
      onSuccess: this._handleDone,
      cancelIcon: 'chevron-left',
      saveText: null,
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleSubmit }
      ],
      sections: [
        {
          fields: [
            { name: 'strategy', type: 'radiogroup', required: true, options: [{ value: 'variable', text: 'Evaluate a varibale' },{ value: 'criteria', text: 'Evaluate set of criteria' }], defaultValue: config.strategy },
            ...this._getStrategy()
          ]
        }
      ]
    }
  }

  _getStrategy() {
    const { fields } = this.props
    const { config } = this.state
    if(config.strategy === 'variable') {
      return [
        { label: 'Variable', name: 'variable', type: VariableField, fields, defaultValue: config.variable },
        { label: 'Values', name: 'values', type: ValuesField, defaultValue: config.values }
      ]
    }
    return [
      { label: 'Branches', name: 'branches', type: BranchesField, fields, defaultValue: config.branches }
    ]
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChange(config) {
    this.setState({ config })
  }

  _handleDone() {
    const { config } = this.state
    const { strategy, variable, branches, values } = config
    this.props.onDone({
      strategy,
      variable,
      branches: strategy === 'criteria' ? branches : values
    })
  }

  _handleSubmit() {
    this.form.submit()
  }

}

export default IfThen
