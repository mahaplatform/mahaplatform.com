import Designer from '../../criteria/designer'
import ModalPanel from '../../modal_panel'
import PropTypes from 'prop-types'
import React from 'react'

class CriteriaFieldDesigner extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    comment: PropTypes.any,
    criteria: PropTypes.array,
    entity: PropTypes.string,
    endpoint: PropTypes.string,
    format: PropTypes.any,
    fields: PropTypes.array,
    title: PropTypes.string,
    onDone: PropTypes.func
  }

  state = {
    criteria: null
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <Designer { ...this._getDesigner() } />
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { criteria } = this.props
    this.setState({ criteria })
  }

  _getDesigner() {
    const { endpoint, entity, format, fields } = this.props
    const { criteria } = this.state
    return {
      defaultValue: criteria,
      endpoint,
      entity,
      format,
      fields,
      onChange: this._handleChange
    }
  }

  _getPanel() {
    const { comment, title } = this.props
    return {
      title,
      instructions: comment,
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ],
      rightItems: [
        { label: 'Done', handler: this._handleDone }
      ]
    }
  }

  _handleCancel() {
    this.context.form.pop()
  }

  _handleChange(criteria) {
    this.setState({ criteria })
  }

  _handleDone() {
    const { criteria } = this.state
    this.props.onDone(criteria)
    this.context.form.pop()
  }

}

export default CriteriaFieldDesigner
