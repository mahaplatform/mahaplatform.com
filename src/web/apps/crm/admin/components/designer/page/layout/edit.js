import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import { unflatten } from 'flat'
import React from 'react'

class Section extends React.Component {

  static propTypes = {
    config: PropTypes.object,
    label: PropTypes.string,
    index: PropTypes.number,
    onPop: PropTypes.func,
    onPush: PropTypes.func,
    onUpdate: PropTypes.func
  }

  _handleDone = this._handleDone.bind(this)
  _handleChange = this._handleChange.bind(this)

  render() {
    if(!this.props.config) return null
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { config, label } = this.props
    return {
      title: label,
      onCancel: this._handleDone,
      onChange: this._handleChange,
      cancelText: <i className="fa fa-chevron-left" />,
      saveText: null,
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleDone }
      ],
      sections: [
        {
          fields: [
            { label: 'Label', name: 'label', type: 'textfield', defaultValue: config.label }
          ]
        }
      ]
    }
  }

  _handleChange(data) {
    const { index } = this.props
    this.props.onUpdate(`sections[${index}]`, unflatten(data))
  }

  _handleDone() {
    this.props.onPop()
  }

}

const mapStateToProps = (state, props) => ({
  config: state.crm.designer.config.sections[props.index]
})

export default connect(mapStateToProps)(Section)
