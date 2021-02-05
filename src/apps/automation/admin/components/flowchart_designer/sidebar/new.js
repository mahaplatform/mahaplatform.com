import PropTypes from 'prop-types'
import React from 'react'

class New extends React.PureComponent {

  static propTypes = {
    block: PropTypes.object,
    campaign: PropTypes.object,
    cid: PropTypes.string,
    fields: PropTypes.array,
    properties: PropTypes.array,
    step: PropTypes.object,
    program: PropTypes.object,
    steps: PropTypes.array,
    workflow: PropTypes.object,
    onAdd: PropTypes.func,
    onCancel: PropTypes.func,
    onTokens: PropTypes.func
  }

  _handleAdd = this._handleAdd.bind(this)

  render() {
    const { block } = this.props
    return <block.form { ...this._getType(block) } />
  }

  componentDidMount() {
    const { block, step, onAdd } = this.props
    const { type, action, parent, answer, delta } = step
    if(!block.form) return onAdd(type, action, parent, answer, delta, {})
  }

  _getType(block) {
    const { cid, campaign, fields, properties, program, steps, workflow, onCancel, onTokens } = this.props
    return {
      cid,
      campaign,
      config: block.config,
      fields,
      program,
      properties,
      steps,
      workflow,
      onCancel,
      onChange: () => {},
      onDone: this._handleAdd.bind(this, block.type, block.action),
      onTokens
    }
  }

  _handleAdd(type, action, config) {
    const { step, onAdd } = this.props
    const { parent, answer, delta } = step
    onAdd(type, action, parent, answer, delta, config)
  }

}

export default New
